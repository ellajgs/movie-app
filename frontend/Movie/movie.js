const movieHeader = document.querySelector("#movie-header")
const tableBody = document.querySelector("#movie-table-body")
const backButton = document.querySelector("#back-button")
const movieInfo = document.querySelector("#movie-info-container")

backButton.addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
})

async function getMovieInfo(){
    const movieName = localStorage.getItem("movie-name")
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    
    const response = await fetch(`http://localhost:3000/movies/search?title=${encodeURIComponent(movieName)}`, options);
  
    if (!response.ok) {
        window.location.assign("../Login/login.html")
    }
    const responseObject = await response.json();
    const data = responseObject.data
    return data
}
async function getMovieReviews(){

    const response = await fetch(`http://localhost:3000/movies/search`, options);
  
    if (!response.ok) {
        window.location.assign("../Login/login.html")
    }
    const responseObject = await response.json();
    const data = responseObject.data
    return data
}



function generateTableRow(){
    
        const data = [{
            username: "test1",
            rating: 3,
            comment: " testcom1"},
            
            {username: "test2",
            rating: 4,
            comment: "testcom2"},
            {username: "test3",
            rating: 90,
            comment: "testcomdfdfdf2"}
        ]
        
   
     for(let i = 0; i < data.length; i++){
        const tr = document.createElement("tr");
        const dataObject = data[i]
        for(let key in dataObject){
            const td = document.createElement("td");
            td.innerHTML = dataObject[key]
            tr.appendChild(td)
        }
        tableBody.appendChild(tr)
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

    const object = {
        poster: movie.poster,
        title: movie.title,
        actors: movie.actors,
        plot: movie.plot,
        imdbRating: movie.imdbRating
    }

    for(key in object){
        const h2 = document.createElement("h2")
        movieInfo.appendChild(h2)
        h2.innerHTML = key;
        if (key != 'poster'){
            const p = document.createElement("p")
            p.innerHTML = `${object[key]}`
            movieInfo.appendChild(p)
        }
        else{
            const img = document.createElement("img");
            img.setAttribute("src", object[key])
            movieInfo.appendChild(img)
        }
    }
}

generateTableRow()
displayMovieInfo()