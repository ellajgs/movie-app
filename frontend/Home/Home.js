
const userName = localStorage.getItem("username")
document.getElementById("welcome-text").innerHTML = "Welcome, " + userName + "!"

const token = localStorage.getItem("token");
const user_id = localStorage.getItem("id")
let movieGrid;

const createMovieCard = (movie) => {
    let col = document.createElement('div');
    col.className = 'col';

    let link = document.createElement('a');
    link.href = '/frontend/Movie/movie.html';
    link.className = 'text-decoration-none';
    link.addEventListener('click', () => {
        localStorage.setItem("movie-name", movie.title); 
        localStorage.setItem("movie_id", movie.movie_id);
        localStorage.setItem("imdbid", movie.imdbid )
    });

    let card = document.createElement('div');
    card.className = 'card border-0 shadow-sm rounded-3 overflow-hidden';

    let img = document.createElement('img');
    img.src = movie.poster || '';
    img.alt = `${movie.title} poster`;
    img.className = 'card-img-top';
    img.style.cssText = 'height: 200px; object-fit: cover;';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body p-2 d-flex align-items-center justify-content-between gap-2';

    let title = document.createElement('p');
    title.className = 'mb-0 fw-medium text-dark';
    title.innerText = movie.title;

    let rating = document.createElement('span');
    rating.className = 'badge rounded-pill bg-success-subtle text-success flex-shrink-0';
    rating.innerText = movie.user_rating;

    let director = document.createElement('p');
    director.className = 'mb-0 p-2 text-muted';
    director.style.cssText = 'font-size: 15px; text-align: left;';
    director.innerText = movie.director || '';

    let year = document.createElement('p');
    year.className = 'mb-0 p-2 text-muted';
    year.style.cssText = 'font-size: 12px; text-align: left;';
    year.innerText = movie.movie_year || '';

    cardBody.appendChild(title);
    cardBody.appendChild(rating);
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(director);
    card.appendChild(year);
    link.appendChild(card);
    col.appendChild(link);
    movieGrid.appendChild(col);
};

async function loadUserMovies() {
    try {
        const response = await fetch(`http://localhost:3001/reviews/all/${user_id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}
                `
            }
        });

        if (!response.ok) {
            window.location.assign("../Login/Login.html");
            return;
        }

        const movies = await response.json();
        movieGrid = document.getElementById('movies-grid');

        if (movies.length === 0) {
            movieGrid.innerHTML = "<p class='text-muted'>No movies yet — add a review!</p>";
            return;
        }

        movies.forEach(movie => createMovieCard(movie));

    } catch(err) {
        console.error("Failed to load movies:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    loadUserMovies();

    document.getElementById("logout-nav").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.assign("../Login/Login.html");
    });
});
