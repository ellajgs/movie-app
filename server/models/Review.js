const db = require(`../database/connect`)
class Review{
    constructor({id, used_id, movie_id, user_rating, comments}){
        this.id=id
        this.used_id=used_id
        this.movie_id = movie_id
        this.user_rating = user_rating
        this.comments = comments
    }

    static async create(data){
        const {movieName, movieScore, comments, userID} = data;
        let response = await db.query("INSERT INTO reviews (user_rating, comments) VALUE ($1,$2) RETURNING *;" [movieScore, comments])
        return new Review(response.rows[0])
    }

    
}

module.exports = Review;