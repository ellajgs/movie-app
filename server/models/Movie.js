const fetch = require('node-fetch')
const db = require(`../database/connect`)

const OMDB_API_KEY = process.env.OMDB_API_KEY

class Movie{
    constructor({id, title, imdbRating, imdbID, movieyear, poster, actors, director}){
        this.id=id
        this.title=title
        this.imdbRating = imdbRating
        this.imdbID = imdbID
        this.movieyear =movieyear
        this.poster = poster
        this.actors = actors
        this.director = director
    }
    static async findByTitle(title){
        const url = `https://www.omdbapi.com/t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.Response === 'False'){
            throw new Error(data.Error || 'Movie not found')
        }

        return new Movie({
            title: data.Title,
            movieyear: data.Year,
            poster: data.poster,
            actors: data.Actors,
            director: data.director,
            imdbRating: data.imdbRating
        })
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
            imdbRating: data.imdbRating
        })
    }
}

module.exports= Movie