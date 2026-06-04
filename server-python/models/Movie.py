import requests
import os
from database.connect import get_db

OMDB_API_KEY = os.getenv("OMDB_API_KEY")

class Movie:
    def __init__(self, data):
        self.id = data.get('id')
        self.title = data.get('title')
        self.imdbrating = data.get('imdbrating')
        self.rtrating = data.get('rtrating')
        self.mcrating = data.get('mcrating')
        self.avg_rating = data.get('avg_rating')
        self.imdbid = data.get('imdbid')
        self.movie_year = data.get('movie_year')
        self.poster = data.get('poster')
        self.actors = data.get('actors')
        self.director = data.get('director')
        self.plot = data.get('plot')

    def to_dict(self):
        return {
            'poster': self.poster,
            'title': self.title,
            'plot': self.plot,
            'movie_year': self.movie_year,
            'imdbrating': self.imdbrating,
            'rtrating': self.rtrating,
            'mcrating': self.mcrating,
            'avg_rating': self.avg_rating,
            'director': self.director,
            'actors': self.actors,
        }

    @staticmethod
    def get_average_rating(id):
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT avg(user_rating) AS avg_rating FROM reviews WHERE movie_id = %s;", (id,))
        row = cur.fetchone()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        if not row:
            raise Exception("Movie not found")
        return dict(zip(columns, row))

    @staticmethod
    def find_or_add(title):
        conn = get_db()
        cur = conn.cursor()

        cur.execute("SELECT * FROM movies WHERE LOWER(title) = LOWER(%s);", (title,))
        row = cur.fetchone()
        columns = [desc[0] for desc in cur.description]

        if row:
            movie_data = dict(zip(columns, row))

            if movie_data.get('rtrating') is None or movie_data.get('mcrating') is None:
                omdb_response = requests.get(f"https://www.omdbapi.com/?t={title}&apikey={OMDB_API_KEY}")
                omdb_data = omdb_response.json()

                rt_rating = None
                mc_rating = None
                if omdb_data.get('Ratings'):
                    for item in omdb_data['Ratings']:
                        if item['Source'] == 'Rotten Tomatoes':
                            rt_rating = item['Value']
                        elif item['Source'] == 'Metacritic':
                            mc_rating = item['Value']  # ← was unindented

                cur.execute(
                    """UPDATE movies SET rtrating = %s, mcrating = %s
                       WHERE id = %s RETURNING *;""",
                    (
                        float(rt_rating.replace('%', '')) if rt_rating else None,
                        float(mc_rating.split('/')[0]) if mc_rating else None,
                        movie_data['id']
                    )
                )
                row = cur.fetchone()  # ← was outside the if block
                columns = [desc[0] for desc in cur.description]  # ← same
                conn.commit()  # ← same
                movie_data = dict(zip(columns, row))  # ← same

            movie_id = movie_data["id"]
            rating_data = Movie.get_average_rating(movie_id)
            movie_data["avg_rating"] = rating_data["avg_rating"]
            cur.close()
            conn.close()
            return Movie(movie_data)  # ← return was missing from if block

        year_query = f'&y={year}' if year else ''

        response = requests.get(f"https://www.omdbapi.com/?t={title}{year_query}&apikey={OMDB_API_KEY}") # f is like template literals in js
        data = response.json()

        if data.get('Response') == 'False':
            raise Exception(data.get('Error', 'Movie not found'))

        rt_rating = None
        mc_rating = None
        if data.get('Ratings'):
            for item in data["Ratings"]:
                if item["Source"] == "Rotten Tomatoes":
                    rt_rating = item["Value"]
                elif item["Source"] == "Metacritic":
                    mc_rating = item["Value"]

        cur.execute(
            """INSERT INTO movies (title, imdbrating, rtrating, mcrating, imdbid, movie_year, poster, director, actors, plot)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;""",
            (
                data['Title'],
                float(data['imdbRating']) if data['imdbRating'] != 'N/A' else None,
                float(rt_rating.replace('%', '')) if rt_rating else None,
                float(mc_rating.split('/')[0]) if mc_rating else None,
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
        conn.commit()
        cur.close()
        conn.close()
        return Movie(movie_data) # this whole bit is turning what we got back from the db rows into an object with key value pairs


    @staticmethod
    def get_all_movies():
        print("hit model")
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT title FROM movies;")
        rows = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        if not rows:
            return []
        return [dict(zip(columns, row)) for row in rows]
