// const userName = localStorage.getItem("username");
// document.getElementById("user-name").textContent = userName;

const tableBody = document.querySelector("#movie-table-body")

document.getElementById("row-1").addEventListener("click", () => {
    localStorage.setItem("movie-name", "The Dark Knight")
    window.location.assign("../moviePython/movie.html")
})

function generateTableRow(){
    
        const data = [,
            
            {movie: "Dune",
            review: 9},
            {movie: "It",
            review: 8}
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
generateTableRow()
// const logoutBtn = document.querySelector()


// document.getElementById("user-nav").addEventListener("click", () => {
//     window.location.assign()
// })

// document.getElementById("classes-nav").addEventListener("click", () => {
//     window.location.assign()
// })

// document.getElementById("scores-nav").addEventListener("click", () => {
//     window.location.assign()
// })

// document.getElementById("game-1").addEventListener("click", () => {
//     console.log("here");
//     localStorage.setItem("challengeId","1");
//     window.location.assign("../Game/Game.html");
// });

// document.getElementById("game-2").addEventListener("click", () => {
//     alert("This game is under development!");
// });

// document.getElementById("game-3").addEventListener("click", () => {
//     alert("This game is under development!");
// });

// document.getElementById("game-4").addEventListener("click", () => {
//     alert("This game is under development!");
// });

// document.getElementById("logout-nav").addEventListener("click", () => {
//     window.location.assign("../Login/login.html");
// });

