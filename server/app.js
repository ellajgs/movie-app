const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const loginRouter = require("./routes/loginRouter")
const moviesRouter = require("./routes/movies")
const reviewRouter = require("./routes/reviewRouter")

app.use("/users", loginRouter)
app.use("/movies", moviesRouter)
app.use("/reviews", reviewRouter)



app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

module.exports = app;