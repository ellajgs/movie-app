from database.connect import get_db

class Review:
    def __init__(self, data):
        self.id = data.get('id')
        self.user_id = data.get('user_id')
        self.movie_id = data.get('movie_id')
        self.user_rating = data.get('user_rating')
        self.comments = data.get('comments')
        self.username = data.get('username')
        self.poster = data.get('poster')
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'user_rating': self.user_rating,
            'comments': self.comments,
            'username': self.username,
            'poster': self.poster,
        }
    
    @staticmethod
    def get_by_user(id):
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """SELECT r.id, r.user_rating, r.comments, m.title, m.poster, m.imdbRating, m.imdbID
         FROM reviews AS r
         LEFT JOIN movies AS m ON r.movie_id = m.id
         WHERE r.user_id = %s;""",
            (id,)
        )
        rows = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        return [Review(dict(zip(columns, row))).to_dict() for row in rows]
    

    @staticmethod
    def get_by_movie(movie_id):
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
           """SELECT r.id, r.user_id, r.movie_id, r.user_rating, r.comments, u.username, m.poster
            FROM reviews AS r
            LEFT JOIN users AS u ON r.user_id = u.id
            LEFT JOIN movies AS m ON r.movie_id = m.id
            WHERE r.movie_id = %s;""",
            (movie_id,)
        )
        rows = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        cur.close()
        conn.close()
        return [Review(dict(zip(columns, row))).to_dict() for row in rows]

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