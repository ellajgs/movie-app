from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.json.sort_keys = False
CORS(app)


from controllers.movies import movies_bp
from controllers.reviews import reviews_bp
from controllers.recommendations import recommendations_bp
app.register_blueprint(movies_bp, url_prefix='/movies')
app.register_blueprint(reviews_bp, url_prefix='/reviews')
app.register_blueprint(recommendations_bp, url_prefix='/recs')

if __name__ == '__main__':
    app.run(debug=True, port=3001)