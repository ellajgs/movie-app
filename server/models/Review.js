const db = require(`../database/connect`);

const Movie = require("./Movie");

class Review {
  constructor({ id, user_id, movie_id, user_rating, comments }) {
    this.id = id;
    this.user_id = user_id;
    this.movie_id = movie_id;
    this.user_rating = user_rating;
    this.comments = comments;
  }

  static async create(data) {
    const { movieName, movieScore, comments, userID } = data;
    const movie = await Movie.findOrAdd(movieName);

    const result = await db.query(
      `INSERT INTO reviews (user_id, movie_id, user_rating, comments)
             VALUES ($1, $2, $3, $4)
             RETURNING *;`,
      [userID, movie.id, movieScore, comments],
    );

    return new Review(result.rows[0]);
  }

  static async getByUser(userID) {
    console.log("user id:", userID)
    const result = await db.query(
        `SELECT r.id, r.user_rating, r.comments, m.title, m.poster, m.imdbRating, m.imdbID
         FROM reviews AS r
         LEFT JOIN movies AS m ON r.movie_id = m.id
         WHERE r.user_id = $1;`,
        [userID]
    );
    console.log("hi from models")
    return result.rows;
}

static async getByMovie(movieID) {
    const result = await db.query(
        `SELECT r.id, r.user_rating, r.comments, r.user_id, m.title, m.imdbRating
         FROM reviews AS r
         LEFT JOIN movies AS m ON r.movie_id = m.id
         WHERE r.movie_id = $1;`,
        [movieID]
    );
    return result.rows;
}
}

module.exports = Review;
