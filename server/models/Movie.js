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

        const omdbTitle = title.replace(/\s+/g, '+')

        const url = `https://www.omdbapi.com/?t=${omdbTitle}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
            throw new Error(data.Error || 'Movie not found');
        }

        const result = await db.query(
            `INSERT INTO movies (title, imdbRating, imdbID, movieyear, poster, director, actors, plot)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *;`,
            [
                data.Title,
                parseFloat(data.imdbRating) || null,
                data.imdbID,
                parseInt(data.Year) || null,
                data.Poster,
                data.Director,
                data.Actors,
                data.Plot
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

        const result = await db.query(
            `UPDATE movies SET imdbRating = $1 WHERE imdbID = $2 RETURNING *;`,
            [parseFloat(data.imdbRating) || null, imdbID]
        );

        return new Movie(result.rows[0]);
    }
}

module.exports= Movie