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
<<<<<<< HEAD

        const movie = await Movie.findOrAdd(movie)

        let response = await db.query("INSERT INTO reviews (user_rating, comments) VALUES ($1,$2) RETURNING *;" [movieScore, comments])
=======
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(url);
        const data2 = await response.json();

        if (data2.Response === 'False') {
            throw new Error(data.Error || 'Movie not found');
        }

        let response = await db.query("INSERT INTO reviews (user_id, user_rating, comments) VALUES (($1, $2, $3, $4) RETURNING *;" [movieScore, comments])
>>>>>>> 33e031d443f33b03ab0e0ae2214579fa74559945
        return new Review(response.rows[0])
    }

    
}

module.exports = Review;