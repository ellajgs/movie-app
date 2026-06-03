from pyodide.http import pyfetch
from js import localStorage, window, document, encodeURIComponent, fetch

movie_header = document.querySelector("#movie-header")
table_body   = document.querySelector("#movie-table-body")
back_button  = document.querySelector("#back-button")
movie_info   = document.querySelector("#movie-info-container")

# Back button
def on_back_click(event):
    window.location.assign("../Home/Home.html")

back_button.addEventListener("click", on_back_click)

# Get movie info
async def get_movie_info():
    movie_name = localStorage.getItem("movie-name")

    response = await fetch(
        f"http://localhost:3000/movies/search?title={encodeURIComponent(movie_name)}",
        method="GET",
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    )

    if not response.ok:
        window.location.assign("../Login/login.html")
        return None

    response_object = await response.json()
    return response_object["data"]

# Get movie reviews
async def get_movie_reviews():
    response = await pyfetch(
        "http://localhost:3000/movies/search",
        method="GET",
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    )

    if not response.ok:
        window.location.assign("../Login/login.html")
        return None

    response_object = await response.json()
    return response_object["data"]

# Generate table rows
def generate_table_rows():
    data = [
        {"username": "test1", "rating": 3,  "comment": "testcom1"},
        {"username": "test2", "rating": 4,  "comment": "testcom2"},
        {"username": "test3", "rating": 90, "comment": "testcomdfdfdf2"},
    ]

    for item in data:
        tr = document.createElement("tr")
        for value in item.values():
            td = document.createElement("td")
            td.innerHTML = str(value)
            tr.appendChild(td)
        table_body.appendChild(tr)

# Display movie info
async def display_movie_info():
    # movie = await get_movie_info()
    # if not movie:
    #     return

    movie = {
        "poster": "source-link",
        "title": "testMovie",
        "actors": "testActor1, testActor2",
        "plot": "testPlot",
        "imdbRating": 5
     }



    for key, value in movie.items():
        h2 = document.createElement("h2")
        h2.innerHTML = key
        movie_info.appendChild(h2)

        if key != "poster":
            p = document.createElement("p")
            p.innerHTML = str(value)
            movie_info.appendChild(p)
        else:
            img = document.createElement("img")
            img.setAttribute("src", value)
            movie_info.appendChild(img)

# Run
generate_table_rows()
display_movie_info()