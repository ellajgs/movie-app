
const id = localStorage.getItem("id")
const token = localStorage.getItem("token")


document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

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

    const response = await fetch("http://localhost:3000/reviews/create", options);
    console.log("status:", response.status)
    const data = await response.json();
    console.log(data);

    if (response.status == 201) {
        alert("Review posted")
      } else {
        alert(data.error);
      }
})

document.getElementById("home-nav").addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
})

const movieList = document.getElementById('movie-dropdown')

async function refreshDropdowns() {
    console.log("Refresh Triggered");
    const nameArr = []
    const response = await fetch(`https://fruit-api-14b3.onrender.com/fruits/`)
    const data = response.json()
    .then((data)=>{
    for(let i=0; i<data.length; i++) {
        nameArr.push(data[i].name)
    }
    return nameArr
    })
    
    .then((nameArr) =>{
    for(let i=0; i<nameArr.length; i++) {
        const optionName = document.createElement("option")
        optionName.textContent = nameArr[i]
        optionName.value = nameArr[i]
        movieList.appendChild(optionName)
    }
    })

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