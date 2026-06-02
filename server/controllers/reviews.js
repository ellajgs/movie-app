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


module.exports = {create}