from pyodide.http import pyfetch
from js import localStorage, window, document, encodeURIComponent, fetch

movie_header = document.querySelector("#movie-header")
card_container = document.querySelector("#card-container")
back_button  = document.querySelector("#back-button")
movie_info   = document.querySelector("#movie-info-container")

token = localStorage.getItem("token")


# Back button
def on_back_click():
    window.location.assign("../Home/Home.html")

back_button.addEventListener("click", on_back_click)

# Get movie info
async def get_movie_info():
    movie_name = localStorage.getItem("movie-name")
    # movie_name = "The Dark Knight"
    encoded = str(encodeURIComponent(movie_name))
    
    print(str(encodeURIComponent(movie_name)))

    response = await pyfetch(
        f"http://localhost:3001/movies/search?title={encoded}",
        method="GET",
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
    )

    if not response.ok:
        window.location.assign("../Login/login.html")
        return None

    response_object = await response.json()
    return response_object

# Get movie reviews
async def get_movie_reviews():
    movie_id = localStorage.getItem("movie_id")
    # movie_id = 1
    response = await pyfetch(
        f"http://localhost:3001/reviews/{movie_id}",
        method="GET",
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
    )

    if not response.ok:
        window.location.assign("../Login/login.html")
        return None

    response_object = await response.json()
    return response_object

# Generate table cards
async def generate_cards():
    data = await get_movie_reviews()
    # data = [
    #     {"username": "test1", "rating": 3,  "comment": "testcom1"},
    #     {"username": "test2", "rating": 4,  "comment": "testcom2"},
    #     {"username": "test3", "rating": 90, "comment": "testcom3"},
    # ]

    for item in data:
        card = document.createElement("div")
        card.setAttribute("class", "card mb-3")
        card.setAttribute("style","max-width: 540px;")

        row = document.createElement("div")
        row.setAttribute("class", "row g-0")
        card.appendChild(row)

        rating = document.createElement("div")
        rating.setAttribute("class", "col-md-4 text-center p-5")
        rating.innerHTML = item["user_rating"]
        row.appendChild(rating)

        mainBody = document.createElement("div")
        mainBody.setAttribute("class", "col-md-8")
        row.appendChild(mainBody)

        cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        mainBody.appendChild(cardBody)

        username = document.createElement("h5")
        username.setAttribute("class", "card-title")
        username.innerHTML = item["username"]
        cardBody.appendChild(username)

        comment = document.createElement("p")
        comment.setAttribute("class", "card-text")
        comment.innerHTML = item["comments"]
        cardBody.appendChild(comment)

        card_container.appendChild(card)



# Display movie info
async def display_movie_info():
    movie = await get_movie_info()
    if not movie:
        return

    # movie = {
    #     "poster": "source-link",
    #     "title": "testMovie",
    #     "actors": "testActor1, testActor2",
    #     "plot": "testPlot",
    #     "imdbRating": 5
    #  }

    document.querySelector("#movie-title").innerHTML = movie.get("title", "")

    movie_info.innerHTML = f"""
        <img src="{movie.get('poster', '')}" class="img-fluid rounded mb-3" alt="Movie poster">
        <p><strong>Director:</strong> {movie.get('director', 'N/A')}</p>
        <p><strong>Actors:</strong> {movie.get('actors', 'N/A')}</p>
        <p><strong>Year:</strong> {movie.get('movie_year', 'N/A')}</p>
        <p><strong>Plot:</strong> {movie.get('plot', 'N/A')}</p>
        <p><strong>IMDB Rating:</strong> {movie.get('imdbrating', 'N/A')}/10</p>
    """

    #for key, value in movie.items():
        #h2 = document.createElement("h2")
        #h2.innerHTML = key
        #movie_info.appendChild(h2)

        #if key != "poster":
            #p = document.createElement("p")
            #p.innerHTML = str(value)
            #movie_info.appendChild(p)
        #else:
            #img = document.createElement("img")
            #print(value)
            #img.setAttribute("src", value)
            #movie_info.appendChild(img)

# Run
await generate_cards()
await display_movie_info()