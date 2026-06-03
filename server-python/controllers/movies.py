from flask import Blueprint, jsonify, request
from models.Movie import Movie

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
@movies_bp.route('/refresh/<imdb_id>', methods=['GET'])
def refresh_rating(imdb_id):
    try:
        movie = Movie.get_by_imdb_id(imdb_id)
        return jsonify({'imdb_rating': movie.imdb_rating, 'imdb_id': movie.imdb_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
    
    #extra note - flask does async/await by default so no need to add