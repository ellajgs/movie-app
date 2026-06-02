const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const userRouter = require("./routes/users")
const moviesRouter = require("./routes/movies")

app.use("/user", userRouter)
app.use("/movies", moviesRouter)


app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

module.exports = app;