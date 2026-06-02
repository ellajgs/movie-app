const Movie = require('../models/Movie')

async function searchMovie(req,res){
    try{
        const { title } = req.query;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const movie = await Movie.findOrAdd(title);
        res.json(movie);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function refreshRating(req, res) {
    try {
        const { imdbID } = req.params;
        const movie = await Movie.findByImdbID(imdbID);
        res.json({ imdbRating: movie.imdbRating, imdbID: movie.imdbID });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = { searchMovie, refreshRating };