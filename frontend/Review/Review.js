const id = localStorage.getItem("userID")

document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            movieName: form.get("movie-name"),
            movieScore: form.get("movie-score"),
            comments: form.get("comments"),
            userID: id
        })
    }

    const response = await fetch("http://localhost:3000/movie/", options);
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
        alert("Review posted")
      } else {
        alert(data.error);
      }
})

document.getElementById("home-nav").addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
})
