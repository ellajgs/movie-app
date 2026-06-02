document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    console.log(form)

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.get("name"),
            form: form.get("form"),
            username: form.get("username"),
            password: form.get("password")
        })
    } 
    console.log(options)

    const response = await fetch("http://localhost:3000/login/register", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("../Login/login.html");
    } else {
        alert(data.error);
    }
})

document.getElementById("login-nav").addEventListener("click", () => {
    window.location.assign("../Login/login.html")
})