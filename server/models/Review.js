const db = require(`../database/connect`)
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
        let response = await db.query("INSERT INTO reviews (user_rating, comments) VALUES ($1,$2) RETURNING *;" [movieScore, comments])
        return new Review(response.rows[0])
    }

    
}

module.exports = Review;