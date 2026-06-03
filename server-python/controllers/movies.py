from flask import Blueprint, jsonify, request
from models.Movie import Movie

movies_bp = Blueprint('movies', __name__)

# GET /movies/search?title={title}
@movies_bp.route('/search', methods=['GET'])
def search_movie():
    title = request.args.get('title')
    if not title:
        return jsonify({'error': 'Title is required'}), 400
    try:
        movie = Movie.find_or_add(title)
        return jsonify(movie.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# GET /movies/refresh/<imdb_id>
@movies_bp.route('/refresh/<imdb_id>', methods=['GET'])
def refresh_rating(imdb_id):
    try:
        movie = Movie.get_by_imdb_id(imdb_id)
        return jsonify({'imdb_rating': movie.imdb_rating, 'imdb_id': movie.imdb_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404