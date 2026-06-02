DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS reviews;

--Users
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

--Movies
CREATE TABLE movies (
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) UNIQUE,
    imdbRating FLOAT,
    imdbID VARCHAR UNIQUE,
    movieyear INT,
    poster VARCHAR,
    director VARCHAR,
    actors VARCHAR,
    plot VARCHAR,
    PRIMARY KEY (id)
);
--Reviews
CREATE TABLE reviews (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT REFERENCES users(id),
    movie_id INT REFERENCES movies(id),
    user_rating FLOAT,
    comments VARCHAR(500),
    PRIMARY KEY (id)
);