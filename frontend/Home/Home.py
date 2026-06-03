from pyodide.http import pyfetch
from js import localStorage, window

# Get movie info

async def get_user_movies():
    response = await pyfetch(
        f"http://localhost:3001/home",
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
    return response_object

    