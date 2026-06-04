from flask import Blueprint, jsonify, request
from models.Movie import Movie
import requests
import os

movies_bp = Blueprint('movies', __name__) # blueprint is like express.Router()
# so this line is like const moviesRouter = express.Router()
# movies is a name for the blueprint and __name__ is something you just need to put there for Flask


# GET /movies/search?title=<title>
@movies_bp.route('/search', methods=['GET'])
def search_movie():
    title = request.args.get('title') #like req.query
    if not title:
        return jsonify({'error': 'Title is required'}), 400
    try:
        movie = Movie.find_or_add(title)
        return jsonify(movie.to_dict()), 200 #like res.status(200).json(movie)
    except Exception as e: #like catch
        return jsonify({'error': str(e)}), 404

# GET /movies/refresh/<imdb_id>
@movies_bp.route('/refresh/<movie_id>', methods=['GET'])
def refresh_rating(movie_id):
    try:
        movie = Movie.get_average_rating(movie_id)
        print("hit route")
        return jsonify(movie), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
    

# GET /movies/combined/<imdb_id>
@movies_bp.route('/combined/<movie_id>', methods=['GET'])
def combined_rating(movie_id):
    try:
        movie = Movie.get_combined_rating(movie_id)
        print("hit route")
        return jsonify(movie), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
    
    #extra note - flask does async/await by default so no need to add

@movies_bp.route('/suggestions', methods=['GET'])
def movie_suggestions():
    title = request.args.get('title')

    if not title:
        return jsonify([]), 200

    try:
        response = requests.get(
            "https://www.omdbapi.com/",
            params={
                "s": title,
                "type": "movie",
                "apikey": os.getenv("OMDB_API_KEY")
            }
        )

        data = response.json()

        if data.get("Response") == "False":
            return jsonify([]), 200

        movies = []

        for movie in data.get("Search", []):
            movies.append({
                "title": movie.get("Title"),
            })

        return jsonify(movies), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500