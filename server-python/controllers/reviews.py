from flask import Blueprint, jsonify, request
from models.Review import Review
from models.Movie import Movie
import jwt
import os

reviews_bp = Blueprint('reviews', __name__)

def get_user_from_token(request):
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        raise Exception('No token provided')
    decoded = jwt.decode(token, os.getenv('SECRET_TOKEN'), algorithms=['HS256'])
    return decoded 

# GET /reviews/all/<id> — all reviews for a user
@reviews_bp.route('/all/<int:id>', methods=['GET'])
def get_user_reviews(id):
    try:
        reviews = Review.get_by_user(id)
        return jsonify(reviews), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# GET /reviews/<movie_id> — all reviews for a movie
@reviews_bp.route('/<int:movie_id>', methods=['GET'])
def get_reviews(movie_id):
    try:
        reviews = Review.get_by_movie(movie_id)
        return jsonify(reviews), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# POST /reviews/create
@reviews_bp.route('/create', methods=['POST'])
def create_review():
    try:
        user = get_user_from_token(request)
        body = request.json

        
        movie = Movie.find_or_add(body['movieName'])

        data = {
            'user_id': user['user_id'],
            'movie_id': movie.id,
            'user_rating': body['movieScore'],
            'comments': body['comments']
        }

        review = Review.create(data)
        return jsonify(review), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400