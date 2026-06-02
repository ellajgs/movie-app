const express = require('express')
const moviesRouter = express.Router()
const {searchMovie, refreshRating} = require('../controllers/movies')

moviesRouter.get('/search', searchMovie)
moviesRouter.get('/refresh/:imdbID', refreshRating)

module.exports = moviesRouter