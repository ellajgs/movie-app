import requests
import os
from database.connect import get_db

OMDB_API_KEY = os.getenv("OMDB_API_KEY")

class Movie:
    def __init__(self, data):
        self.id = data.get('id')
        self.title = data.get('title')
        self.imdb_rating = data.get('imdb_rating')
        self.imdb_id = data.get('imdb_id')
        self.movie_year = data.get('movie_year')
        self.poster = data.get('poster')
        self.actors = data.get('actors')
        self.director = data.get('director')
        self.plot = data.get('plot')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'imdb_rating': self.imdb_rating,
            'imdb_id': self.imdb_id,
            'movie_year': self.movie_year,
            'poster': self.poster,
            'actors': self.actors,
            'director': self.director,
            'plot': self.plot
        }

    @staticmethod #like static async in js
    def find_or_add(title):
        conn = get_db()
        cur = conn.cursor() # these two lines are like db.query

        cur.execute("SELECT * FROM movies WHERE LOWER(title) = LOWER(%s);", (title,))
        row = cur.fetchone() #gets one row from sql query
        columns = [desc[0] for desc in cur.description]

        if row:
            cur.close()
            conn.close()
            return Movie(dict(zip(columns, row)))

        response = requests.get(f"https://www.omdbapi.com/?t={title}&apikey={OMDB_API_KEY}") # f is like template literals in js
        data = response.json()

        if data.get('Response') == 'False':
            raise Exception(data.get('Error', 'Movie not found'))
            #raise Exception is like throw new Error

        cur.execute(
            """INSERT INTO movies (title, imdb_rating, imdb_id, movie_year, poster, director, actors, plot)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;""",
            (
                data['Title'],
                float(data['imdbRating']) if data['imdbRating'] != 'N/A' else None,
                data['imdbID'],
                int(data['Year'][:4]) if data['Year'] else None,
                data['Poster'],
                data['Director'],
                data['Actors'],
                data['Plot']
            )
        )
        row = cur.fetchone()
        columns = [desc[0] for desc in cur.description]
        conn.commit() # saves changes to database
        cur.close() # ends connection with database
        conn.close()
        return Movie(dict(zip(columns, row))) # this whole bit is turning what we got back from the db rows into an object with key value pairs

    @staticmethod
    def get_by_imdb_id(imdb_id):
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM movies WHERE imdb_id = %s;", (imdb_id,))
        row = cur.fetchone()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        if not row:
            raise Exception("Movie not found")
        return Movie(dict(zip(columns, row)))