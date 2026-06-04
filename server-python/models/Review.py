from database.connect import get_db

class Review:
    def __init__(self, data):
        self.id = data.get('id')
        self.user_id = data.get('user_id')
        self.movie_id = data.get('movie_id')
        self.user_rating = data.get('user_rating')
        self.comments = data.get('comments')
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'user_rating': self.user_rating,
            'comments': self.comments,
        }
    
    @staticmethod
    def get_by_user(id):
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """SELECT r.id, r.user_rating, r.comments, m.title, m.poster, m.imdbrating, m.imdbid FROM reviews AS r LEFT JOIN movies AS m ON r.movie_id = m.id WHERE r.user_id =  %s;""",
            (id,)
        )
        rows = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        output = []
        for row in rows:
            data = dict(zip(columns, row))
            output.append({
            "review_id": data["id"],
            "user_rating": data["user_rating"],
            "comments": data["comments"],
            "movie_title": data["title"],
            "poster": data["poster"],
            "imdbrating": data["imdbrating"],
            "imdbid": data["imdbid"]
            
            
        })

        return output
    

    @staticmethod
    def get_by_movie(movie_id):
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
           """SELECT r.id, r.user_rating, r.comments, r.user_id, m.title, a.username FROM reviews AS r LEFT JOIN movies AS m ON r.movie_id = m.id LEFT JOIN users AS a on r.user_id = a.id WHERE r.movie_id = %s;""",
            (movie_id,)
        )
        rows = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        output = []
        for row in rows:
            data = dict(zip(columns, row))
            output.append({
            "review_id": data["id"],
            "user_id": data["user_id"],
            "username": data["username"],
            "movie_title": data["title"],
            "user_rating": data["user_rating"],
            "comments": data["comments"]
        })

        return output

    @staticmethod
    def create(data):
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO reviews (user_id, movie_id, user_rating, comments)
               VALUES (%s, %s, %s, %s) RETURNING *;""",
            (data['user_id'], data['movie_id'], data['user_rating'], data['comments'])
        )
        row = cur.fetchone()
        columns = [desc[0] for desc in cur.description]
        conn.commit()
        cur.close()
        conn.close()
        return Review(dict(zip(columns, row))).to_dict()