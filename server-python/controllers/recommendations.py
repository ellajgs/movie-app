from flask import Blueprint, jsonify, request
from models.Review import Review
from models.Movie import Movie
import google.generativeai as genai
import os
import json
import requests

recommendations_bp = Blueprint('recommendations', __name__)

def get_user_from_token(request):
    import jwt
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    decoded = jwt.decode(token, os.getenv('SECRET_TOKEN'), algorithms=['HS256'])
    return decoded
@recommendations_bp.route('/', methods=['GET'])
def get_recommendations():
    try:
        user = get_user_from_token(request)
        reviews = Review.get_by_user(user['user_id'])
        
        if not reviews:
            return jsonify({'error': 'No reviews found'}), 404
        
        movie_list = "\n".join([
            f"-{r['title']} (rated {r['user_rating']}/5): {r['comments']}"
            for r in reviews
        ])
        
        prompt = f"""Based on these movies a user has watched and their reviews:
        {movie_list}
        Recommend 4 movies they would enjoy. For each one give:
        Respond ONLY with a JSON array, no other text, no markdown, no backticks.
        Format exactly like this:
        [
            {{"title": "Movie Title", "movie_year": "2001", "reason": "Why they would like it"}},
            {{"title": "Movie Title", "movie_year": "2009", "reason": "Why they would like it"}}
        ]"""
        
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        recommendations = json.loads(response.text)
        
        omdb_key=os.getenv('OMDB_API_KEY')
        enriched = []
        for rec in recommendations:
            omdb_response = requests.get(
                f"https://www.omdbapi.com/?t={rec['title']}&apikey={omdb_key}"
            )
            omdb_data=omdb_response.json()
            
            try:
                movie = Movie.find_or_add(rec['title'])
                movie_id = movie.id
                print("SUCCESS - movie_id:", movie_id)
            except Exception as e:
                print("FAILED - find_or_add error:", e) 
                movie_id = None

            enriched.append({
            'movie_id': movie_id,
            'title': rec['title'],
            'movie_year': rec.get('movie_year') or rec.get('year', 'N/A'),
            'reason': rec['reason'],
            'poster': omdb_data.get('Poster', ''),
            'imdbrating': omdb_data.get('imdbRating', 'N/A'),
            'actors': omdb_data.get('Actors', 'N/A'),
            'director': omdb_data.get('Director', 'N/A')
            })
            
        return jsonify({'recommendations': enriched}), 200
    
    except json.JSONDecodeError:
        return jsonify({'error':'AI response could not be parsed'}), 500
    except Exception as e:
        return jsonify({'error':str(e)}), 400