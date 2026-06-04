
const id = localStorage.getItem("id")
const token = localStorage.getItem("token")


document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const score = form.get("movie-score");
    if (!score || isNaN(score)) {
        alert("Please select a valid movie score");
        return;
    }

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            movieYear: form.get("movie-year"),
            movieName: form.get("movie-name"),
            movieScore: form.get("movie-score"),
            comments: form.get("comments"),
            userID: id
        })
    }

    const response = await fetch("http://localhost:3001/reviews/create", options);
    console.log("status:", response.status)
    const data = await response.json();
    console.log(data);

    if (response.status == 201) {
        alert("Review posted")
        window.location.assign("../Home/Home.html")
      } else {
        alert(data.error);
      }
})

document.getElementById("home-nav").addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
})

const movieList = document.getElementById('movies')
const testData = [
    {title:"test 1"},
    {title:"test 2"},
    {title:"test 3"}
]

async function refreshDropdowns() {
    console.log("Refresh Triggered");
    const response = await fetch(`http://localhost:3001/movies/all`)
    const data = await response.json()
//   const data = await Promise.resolve(testData);
 console.log(data);
  data.forEach(movie => {
    const option = document.createElement("option");
    option.textContent = movie.title +'   -   ('+ movie.movie_year + ')'
    option.value = movie.title;
    movieList.appendChild(option);
  });
}

refreshDropdowns()

const yearList = document.getElementById("movie-year")

function loadyear() {
    for(let i=2026; i>1900; i--) {
        const optionName = document.createElement("option")
        optionName.textContent = i
        optionName.value = i
        yearList.appendChild(optionName)
    }}

loadyear()