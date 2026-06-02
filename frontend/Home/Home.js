// const userName = localStorage.getItem("username");
// document.getElementById("user-name").textContent = userName;

document.getElementById("user-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("classes-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("scores-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("game-1").addEventListener("click", () => {
    console.log("here");
    localStorage.setItem("challengeId","1");
    window.location.assign("../Game/Game.html");
});

document.getElementById("game-2").addEventListener("click", () => {
    alert("This game is under development!");
});

document.getElementById("game-3").addEventListener("click", () => {
    alert("This game is under development!");
});

document.getElementById("game-4").addEventListener("click", () => {
    alert("This game is under development!");
});

document.getElementById("logout-nav").addEventListener("click", () => {
    window.location.assign("../Login/login.html");
});