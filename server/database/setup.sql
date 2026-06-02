DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

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
    imdb_rating INT,
    imdb_id VARCHAR,
    movie_year INT,
    poster VARCHAR,
    director VARCHAR,
    actors VARCHAR,
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

INSERT INTO users (username, password_hash)
VALUES
('harry', 'test123'),
('jane', 'password456'),
('mike', 'hello789');

INSERT INTO movies (
    title,
    imdb_rating,
    imdb_id,
    movie_year,
    poster,
    director,
    actors
)
VALUES
(
    'The Dark Knight',
    90,
    'tt0468569',
    2008,
    'https://example.com/darkknight.jpg',
    'Christopher Nolan',
    'Christian Bale, Heath Ledger'
),
(
    'Inception',
    88,
    'tt1375666',
    2010,
    'https://example.com/inception.jpg',
    'Christopher Nolan',
    'Leonardo DiCaprio, Tom Hardy'
),
(
    'Interstellar',
    86,
    'tt0816692',
    2014,
    'https://example.com/interstellar.jpg',
    'Christopher Nolan',
    'Matthew McConaughey, Anne Hathaway'
);

-- Seed Reviews
INSERT INTO reviews (
    user_id,
    movie_id,
    user_rating,
    comments
)
VALUES
(1, 1, 9.5, 'Amazing film'),
(2, 2, 8.5, 'Really clever story'),
(3, 3, 9.0, 'Beautiful sci-fi movie');

