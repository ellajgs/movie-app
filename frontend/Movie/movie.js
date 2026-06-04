const movieHeader = document.querySelector("#movie-header")
const tableBody = document.querySelector("#movie-table-body")
const backButton = document.querySelector("#back-button")
const movieInfo = document.querySelector("#movie-info-container")
const cardContainer = document.querySelector("#card-container")
const token = localStorage.getItem("token")


backButton.addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
    localStorage.removeItem("movie-name")
    localStorage.removeItem("movie_id")
})

async function getMovieInfo(){
    const movieName = localStorage.getItem("movie-name")
    const movie_id = localStorage.getItem("movie_id")
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    
    // use ID endpoint if available, fall back to search
    const url = movie_id && movie_id !== "null"
        ? `http://localhost:3001/movies/${movie_id}`
        : `http://localhost:3001/movies/search?title=${encodeURIComponent(movieName)}`
    
    const response = await fetch(url, options);
    if (!response.ok) {
        window.location.assign("../Login/login.html")
    }
    return await response.json();
}
async function getMovieReviews(){
    const movie_id = localStorage.getItem("movie_id")

    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch(`http://localhost:3001/reviews/${movie_id}`, options);
  
    if (!response.ok) {
        window.location.assign("../Login/login.html")
    }
    const responseObject = await response.json();
    const data = responseObject
    return data
}



async function generateCards(){
    data = await getMovieReviews()
    commentTitle = document.createElement("h2")
    commentTitle.innerHTML = 'Comments:'
    cardContainer.appendChild(commentTitle)
    
        
    for (let i = 0; i < data.length; i++){
            let reviewObject = data[i]

            card = document.createElement("div")
            card.setAttribute("class", "card mb-3 ")

            row = document.createElement("div")
            row.setAttribute("class", "row g-0 ")
            card.appendChild(row)

            rating = document.createElement("div")
            rating.setAttribute("class", "col-md-4 text-center p-5")
            rating.innerHTML = reviewObject["user_rating"]
            row.appendChild(rating)

            mainBody = document.createElement("div")
            mainBody.setAttribute("class", "col-md-8")
            row.appendChild(mainBody)

            cardBody = document.createElement("div")
            cardBody.setAttribute("class", "card-body ")
            mainBody.appendChild(cardBody)

            username = document.createElement("h5")
            username.setAttribute("class", "card-title")
            username.innerHTML = `${reviewObject["username"]}`
            cardBody.appendChild(username)

            comment = document.createElement("p")
            comment.setAttribute("class", "card-text")
            comment.innerHTML = `${reviewObject["comments"]}`
            cardBody.appendChild(comment)

            cardContainer.appendChild(card)

    }
    
}

async function displayMovieInfo(){
    // let object = {
    //     poster: "source-linkwew",
    //     title: "testMovie",
    //     actors: "testActor1, testActor2",
    //     plot: "asdojdjasndjokas",
    //     imdbRating: 5
    // };
    const movie = await getMovieInfo()
    
    document.querySelector("#movie-title").innerHTML = movie["title"]

    movieInfo.innerHTML = `
        <img src=${movie["poster"]} class="img-fluid rounded mb-3" alt="Movie poster">
        <p><strong>Director:</strong> ${movie["director"]}</p>
        <p><strong>Actors:</strong> ${movie["actors"]}</p>
        <p><strong>Year:</strong> ${movie["movie_year"]}</p>
        <p><strong>Plot:</strong> ${movie["plot"] === null ? "N/A" : movie["plot"]}</p>
        <p><strong>IMDB Rating:</strong> ${movie["imdbrating"]}/10</p>
        <p><strong>Rotten Tomatoes:</strong> ${movie["rtrating"]}/100</p>
        <p><strong>Metacritic:</strong> ${movie["mcrating"]}/100</p>
        <p><strong>Combined Rating:</strong> ${movie["combined_rating"] ?? "N/A"}/100</p>
        <p><strong>Avg Site Rating:</strong> ${movie["avg_rating"] ?? "N/A"}/5</p>

    `

    // for(key in object){
    //     const h2 = document.createElement("h2")
    //     movieInfo.appendChild(h2)
    //     h2.innerHTML = key;
    //     if (key != 'poster'){
    //         const p = document.createElement("p")
    //         p.innerHTML = `${object[key]}`
    //         movieInfo.appendChild(p)
    //     }
    //     else{
    //         const img = document.createElement("img");
    //         img.setAttribute("src", object[key])
    //         movieInfo.appendChild(img)
    //     }
    // }
}

generateCards()
displayMovieInfo()