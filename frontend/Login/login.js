document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/login/login", options);
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username)
        localStorage.setItem("id", data.id)
        window.location.assign("../Home/Home.html");
      } else {
        alert(data.error);
      }
})

document.getElementById("register-nav").addEventListener("click", () => {
    window.location.assign("../Register/Register.html")
})