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
        body: {
            title: movieName
        }
    }
    
    const response = await fetch(`http://localhost:3000/search${movieName}`, options);
  
    if (!response.ok) {
        window.location.assign("../Login/login.html")
    }
    const responseObject = await response.json();
    const data = responseObject.data
    return data
}
function getMovieReviews(){}



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

function displayMovieInfo(){
    // const img = document.createElement("img");
    // img.setAttribute("src", "source-link")
    // movieInfo.appendChild(img)
    let object = {
        poster: "source-link",
        title: "testMovie",
        actors: "testActor1, testActor2",
        plot: "asdojdjasndjokas",
        imdbRating: 5
    };
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

        }
    }
    movieInfo.appendChild(ul)
}

generateTableRow()
displayMovieInfo()