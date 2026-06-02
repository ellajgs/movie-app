const fetch = require('node-fetch')
const db = require(`../database/connect`)

const OMDB_API_KEY = process.env.OMDB_API_KEY

class Movie{
    constructor({id, title, imdbRating, imdbID, movieyear, poster, actors, director, plot}){
        this.id=id
        this.title=title
        this.imdbRating = imdbRating
        this.imdbID = imdbID
        this.movieyear =movieyear
        this.poster = poster
        this.actors = actors
        this.director = director
        this.plot = plot
    }
    static async findOrAdd(title){
        const existing = await db.query(
            "SELECT * FROM movies WHERE LOWER(title) = LOWER($1);",
            [title]
        );

        if (existing.rows.length > 0) {
            return new Movie(existing.rows[0]);
        }


        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
            throw new Error(data.Error || 'Movie not found');
        }

        const result = await db.query(
            `INSERT INTO movies (title, imdbRating, imdbID, movieyear, poster, director, actors)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *;`,
            [
                data.Title,
                parseFloat(data.imdbRating) || null,
                data.imdbID,
                parseInt(data.Year) || null,
                data.Poster,
                data.Director,
                data.Actors
            ]
        );

        return new Movie(result.rows[0]);
    }

    static async findByImdbID(imdbID){
        const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.Response==='False'){
            throw new Error(data.Error || 'Movie not found');
        }

        return new Movie({
            title: data.Title,
            movieyear: data.Year,
            poster: data.poster,
            actors: data.Actors,
            director: data.director,
            imdbRating: data.imdbRating,
            plot: data.plot,
        })
    }
}

module.exports= Movie