const express = require('express')
const moviesRouter = express.Router()
const {searchMovie, refreshRating} = require('../controllers/movies')

moviesRouter.post('/search', searchMovie)
moviesRouter.get('/refresh/:imdb_id', refreshRating)

module.exports = moviesRouter