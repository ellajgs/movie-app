const movieHeader = document.querySelector("#movie-header")
const movieTable = document.querySelector("#movie-table")
const tableBody = document.querySelector("#movie-table-body")
const backButton = document.querySelector("#back-button")

backButton.addEventListener("click", () => {
    window.location.assign("./Home/Home.html")
})

function getMovieInfo(){}

const data;

function generateTableRow(){
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    for(let i = 0; i++; i< data.length){}
    
}
