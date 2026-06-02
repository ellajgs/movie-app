const { Router } = require("express")

const reviewController = require("../controllers/reviews")

const reviewRouter = Router()

reviewRouter.post("/create", reviewController.create)
reviewRouter.get("/all/:id", reviewController.show)
reviewRouter.get("/:movie_id", reviewController.movie)

module.exports = reviewRouter