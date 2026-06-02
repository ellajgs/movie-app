const movieHeader = document.querySelector("#movie-header")
const tableBody = document.querySelector("#movie-table-body")
const backButton = document.querySelector("#back-button")
const movieInfo = document.querySelector("#movie-info-container")

backButton.addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
})

function getMovieInfo(){}
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
    const img = document.createElement("img");
    const text = document.createElement("p");


    movieInfo.textContent
    questionText.textContent = dialogue
    gameContainer.appendChild(speechBubble)
    speechBubble.appendChild(questionText)

}

generateTableRow()