const db = require(`../database/connect`)

const Movie = require('./Movie')


class Review{
    constructor({id, user_id, movie_id, user_rating, comments}){
        this.id=id
        this.user_id=user_id
        this.movie_id = movie_id
        this.user_rating = user_rating
        this.comments = comments
    }

    static async create(data){
        const {movieName, movieScore, comments, userID} = data;
        const movie = await Movie.findOrAdd(movieName)

        const result = await db.query(
            `INSERT INTO reviews (user_id, movie_id, user_rating, comments)
             VALUES ($1, $2, $3, $4)
             RETURNING *;`,
            [userID, movie.id, movieScore, comments]
        );

        return new Review(result.rows[0]);

    
}
}

module.exports = Review;