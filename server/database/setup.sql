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
    imdbRating FLOAT,
    imdbID VARCHAR,
    movie_year INT,
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

INSERT INTO users (username, password_hash)
VALUES
('anthony', 'test123'),
('jane', 'test123'),
('mike', 'test123'),
('sarah', 'test123'),
('daniel', 'test123');

-- Seed Movies
INSERT INTO movies (
    title,
    imdbRating,
    imdbID,
    movie_year,
    poster,
    director,
    actors
)
VALUES
('The Dark Knight', 90, 'tt0468569', 2008, 'https://example.com/dark-knight.jpg', 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart'),
('Inception', 88, 'tt1375666', 2010, 'https://example.com/inception.jpg', 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page'),
('Interstellar', 86, 'tt0816692', 2014, 'https://example.com/interstellar.jpg', 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain'),
('Get Out', 78, 'tt5052448', 2017, 'https://example.com/get-out.jpg', 'Jordan Peele', 'Daniel Kaluuya, Allison Williams, Bradley Whitford'),
('Parasite', 85, 'tt6751668', 2019, 'https://example.com/parasite.jpg', 'Bong Joon Ho', 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong');

-- Seed Reviews
INSERT INTO reviews (user_id, movie_id, user_rating, comments)
VALUES
(1, 1, 9.5, 'Brilliant pacing, intense performances, and one of the strongest villains in any superhero film. The story feels grounded while still being exciting.'),
(2, 1, 9.0, 'A dark and gripping movie with excellent action scenes. Heath Ledger completely steals the film.'),
(3, 1, 8.5, 'Really strong film overall, although it feels slightly long in the final act.'),

(1, 2, 9.0, 'A clever and ambitious story. The dream layers are handled really well and the ending leaves you thinking.'),
(4, 2, 8.0, 'Visually impressive and exciting, but some parts needed more emotional depth.'),

(2, 3, 9.0, 'Beautiful, emotional and massive in scale. The music and visuals make it feel unforgettable.'),
(5, 3, 8.5, 'A thoughtful sci-fi film with strong performances. Some science parts are confusing, but the emotional story works.'),

(3, 4, 8.5, 'Smart, tense and original. It mixes horror and social commentary really effectively.'),
(4, 4, 9.0, 'One of the most memorable thrillers I have seen. The tension builds perfectly.'),

(1, 5, 9.5, 'Sharp, funny, tense and unpredictable. The class commentary is handled brilliantly.'),
(2, 5, 9.0, 'Excellent film with a great shift in tone halfway through. The ending is powerful.'),
(5, 5, 8.0, 'Very well made and original, though I preferred the first half to the second.');

-- INSERT INTO users (username, password_hash)
-- VALUES
-- ('harry', 'test123'),
-- ('jane', 'password456'),
-- ('mike', 'hello789');

-- INSERT INTO movies (
--     title,
--     imdbRating,
--     imdbID,
--     movie_year,
--     poster,
--     director,
--     actors
-- )
-- VALUES
-- (
--     'The Dark Knight',
--     90,
--     'tt0468569',
--     2008,
--     'https://example.com/darkknight.jpg',
--     'Christopher Nolan',
--     'Christian Bale, Heath Ledger'
-- ),
-- (
--     'Inception',
--     88,
--     'tt1375666',
--     2010,
--     'https://example.com/inception.jpg',
--     'Christopher Nolan',
--     'Leonardo DiCaprio, Tom Hardy'
-- ),
-- (
--     'Interstellar',
--     86,
--     'tt0816692',
--     2014,
--     'https://example.com/interstellar.jpg',
--     'Christopher Nolan',
--     'Matthew McConaughey, Anne Hathaway'
-- );

-- -- Seed Reviews
-- INSERT INTO reviews (
--     user_id,
--     movie_id,
--     user_rating,
--     comments
-- )
-- VALUES
-- (1, 1, 9.5, 'Amazing film'),
-- (2, 2, 8.5, 'Really clever story'),
-- (3, 3, 9.0, 'Beautiful sci-fi movie');

