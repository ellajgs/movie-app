const db = require(`../database/connect`)
class Review{
    constructor({id, used_id, movie_id, user_rating, comments}){
        this.id=id
        this.used_id=used_id
        this.movie_id = movie_id
        this.user_rating = user_rating
        this.comments = comments
    }
}