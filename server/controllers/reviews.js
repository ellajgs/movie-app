const Review = require("../models/Review")

async function create (req, res) {
    try {
        const data = req.body;
        const newReview = await Review.create(data);
        res.status(201).json(newReview);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}


async function show(req, res) {
    try {
        const {id} = req.params;
        console.log(id)
        const reviews = await Review.getByUser(parseInt(id));
        res.status(200).json(reviews);
    } catch(err) {
        res.status(404).json({ error: err.message });
    }
}


async function movie(req, res) {
    try {
        const { movie_id } = req.params;
        const reviews = await Review.getByMovie(movie_id);
        res.status(200).json(reviews);
    } catch(err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = { create, show, movie };