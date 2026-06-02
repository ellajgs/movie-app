--Users
CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY 
    username VARCHAR(50) UNIQUE NOT NULL
    password_hash VARCHAR(255) NOT NULL
    PRIMARY KEY (id)
)

--Movies
CREATE TABLE IF NOT EXISTS movies (
    id INT GENERATED ALWAYS AS IDENTITY
    title VARCHAR(100) UNIQUE 
    imdb_rating INT
    imdb_id VARCHAR
    PRIMARY KEY (id)
)
--Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id INT GENERATED ALWAYS AS IDENTITY
    user_id INT REFERENCES users(id)
    movie_id INT REFERENCES movies(id)
    user_rating INT (user_rating BETWEEN 0 and 10)
    comments VARCHAR(500)
    PRIMARY KEY (id)
)