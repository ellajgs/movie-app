const db = require(`../database/connect`)
class Movie{
    constructor({id, title, imdb_rating, imdb_id}){
        this.id=id
        this.title=title
        this.imdb_rating = imdb_rating
        this.imdb_id = imdb_id
    }
}