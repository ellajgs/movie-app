// const userName = localStorage.getItem("username")
// document.getElementById("username").textContent = userName

// const switchLanguage = document.querySelectorAll(".dropdown-item").forEach(item => {})

const token = localStorage.getItem("token");

const recommendations = async () => {
  const response = await fetch("http://localhost:3001/recs/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    window.location.assign("../Login/Login.html");
    return null;
  }

  const data = await response.json();
  return data.recommendations;
};

let movieGrid;

const createMovieCard = (movie) => {
  let col = document.createElement("div");
  col.className = "col";

  let link = document.createElement("a");
  link.href = "/frontend/Movie/Movie.html";
  link.className = "text-decoration-none";

  link.addEventListener("click", () => {
    console.log("full movie object:", movie);
    console.log("movie_id value:", movie.movie_id)
    localStorage.setItem("movie-name", movie.title);
    localStorage.setItem("movie_id", movie.movie_id);
  });

  let card = document.createElement("div");
  card.className = "card border-0 shadow-sm rounded-3 overflow-hidden";

  let img = document.createElement("img");
  img.src = movie.poster;
  img.alt = `${movie.title} poster`;
  img.className = "card-img-top";
  img.style.cssText = "height: 200px; object-fit: cover;";

  let cardBody = document.createElement("div");
  cardBody.className =
    "card-body p-2 d-flex align-items-center justify-content-between gap-2";

  let title = document.createElement("p");
  title.className = "mb-0 fw-medium text-dark";
  title.innerText = movie.title;

  let director = document.createElement("p");
  director.className = "mb-0 p-2 text-muted";
  director.style.cssText = "font-size: 15px; text-align: left;";
  director.innerText = movie.director;

  let year = document.createElement("p");
  year.className = "mb-0 p-2 text-muted";
  year.style.cssText = "font-size: 12px; text-align: left;";
  year.innerText = movie.year;

  cardBody.appendChild(title);
  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(director);
  card.appendChild(year);
  link.appendChild(card);
  col.appendChild(link);
  movieGrid.appendChild(col);
};

const renderMovieCards = async () => {
  const movies = await recommendations();
  if (!movies) return;

  movieGrid = document.getElementById("movies-grid");
  movies.forEach((movie) => {
    createMovieCard(movie);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // userName
  renderMovieCards();

  document.getElementById("logout-nav").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.assign("../Login/Login.html");
  });
});
