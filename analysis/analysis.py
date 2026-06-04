import streamlit as st
import numpy as np
import pandas as pd

# st.write(pd.DataFrame({
#     'first column': [1,2,3,4],
#     'second column': [10,20,30,40]
# }))

# chart_data = pd.DataFrame(
#      np.random.randn(20, 3),
#      columns=['a', 'b', 'c'])

# st.line_chart(chart_data)

def load_data(nrows):
    data = pd.read_csv('./movies.csv', nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis='columns', inplace =True)
    data['review_date'] = pd.to_datetime(data['review_date'])
    return data

data = load_data(10000)



st.header('A exploratory data analysis of the film review data set')
st.write("This is a dashboard intended to be used internally, to allow for teams to be able to see the data we can collect, and to inform design decisions on what data should be collected")
st.write("Let's begin by seeing what Movies are currently in the dataset")

unique_movies = data.drop_duplicates(subset='movie_name')


unique_movies_name =unique_movies["movie_name"].sort_values(ascending=True).reset_index()
st.write(unique_movies_name["movie_name"])
st.write("We can see here that there are 51 movies within our database, all listed below")

genre_counts = (
    unique_movies.groupby('genre')['user_id']
    .count()
    .reset_index(name='count')
)
st.subheader("The number of Movies sorted by Genre in review")
st.bar_chart(genre_counts, x='genre', y='count',x_label="Genre",y_label="Number of Movies", sort='count')
st.write("We can see that the most common Genres of films are Drama and Sci-fi, each having 9 movies")
st.write("Therefore, Drama and Sci-fi each take up 18% of the movies currently in our database")

genre_counts = (
    data.groupby('genre')
    .agg(
        review_count=('genre',"size")
    )
    .reset_index()
)
st.subheader("The number of reviews sorted by genre")
st.bar_chart(genre_counts, x='genre', y='review_count',x_label="Genre",y_label="Number of Reviews", sort='review_count')

st.write("From this we can see that all genres have a similar amount of reviews written for them, however because we are already aware of the amount of movies in each genre, we can quickly see that adventure, which has only one movie, is the second highest amount of reviews. We can then extrapolate this, and know that on a per movie basis, Adventure has the most reviews")

st.subheader("The most common reviewed movies and their average score")

sort_option = st.radio(
    "Sort by",
    ["Review count", "Average score"],
    horizontal=True
)

movie_stats = (
    data.groupby("movie_name")
    .agg(
        review_count=("movie_name", "size"),
        average_score=("user_rating", "mean")
    )
    .sort_values("review_count", ascending=False)
)

if sort_option == "Review count":
    movie_stats = movie_stats.sort_values("review_count", ascending=False)
else:
    movie_stats = movie_stats.sort_values("average_score", ascending=False)


st.write(movie_stats)

st.write("Now is when our data becomes interesting, we can see here that the highest reviewed movie is The Shawshank Redemption. However it's reviews are higher than any singular genre. From this we can conclude that users are using different genres to describe the movie")

genre_counts_shawshank = (
    data[data["movie_name"] == "The Shawshank Redemption"].groupby('genre')
    .agg(
        review_count=('genre',"size")
    )
    .reset_index()
)
st.subheader("The Genre of Reviews for The Shawshank Redemption")
st.bar_chart(genre_counts_shawshank, x='genre', y='review_count',x_label="Genre",y_label="Number of Reviews", sort='review_count')
st.write("That's strange,the categories used just to describe The Shawshank Redemption are the same as all the caegories we saw earlier. Now we can see that the earlier graph showing the amount of movies by genre must be wrong, as we should see movies spread across all genres instead. Let's just check this")

movie = st.selectbox(
    "Select a movie",
    sorted(unique_movies["movie_name"])
)

genre_counts_movie = (
    data[data["movie_name"] == movie]
    .groupby('genre')
    .agg(
        review_count=('genre',"size")
    )
    .reset_index()
)
st.subheader(f"The Genre of Reviews for {movie}")
st.bar_chart(genre_counts_movie, x='genre', y='review_count',x_label="Genre",y_label="Number of Reviews", sort='review_count')

st.write("We can now see that this is consistent across ALL movies currently in the database.In order to resolve this issue, we should add control to the genre field, as otherwise users who describe the movie as different genres can prevent us from drawing insight from the genre field. From an internal viewpoint, we should control the genre's for each, by taking the genre's from the movie details instead of allowing users to input them themselves to prevent this situation")


st.subheader("The Duration of movies")

movie_duration =(
    data.groupby("movie_name")
    .agg(
        duration =("runtime_minutes", "max")
    )
    .sort_values("duration", ascending = True)
    .reset_index()
)
st.bar_chart(movie_duration["duration"])

st.write("Okay, we now know that genres doesn't currently offer any useful insight, so lets try using duration instead. From this initial graph above, we can see the current distribution of movies and their durations")

# st.subheader("The Duration of genres")

# genre_duration =(
#     unique_movies.groupby("genre")
#     .agg(
#         duration =("runtime_minutes", "mean")
#     )
#     .sort_values("duration", ascending = True)
#     .reset_index()
# )
# st.bar_chart(genre_duration,x="genre",y="duration", sort="duration")

st.subheader("Correlation of Ratings to Duration")

duration_avg_rating =(
    data.groupby("movie_name")
    .agg(
        avg_score = ("user_rating","mean"),
        duration =("runtime_minutes", "mean")
    )
)

st.scatter_chart(duration_avg_rating, x="duration",y="avg_score",x_label="Duration",y_label="Average Score")

st.write("Now if we have a look at ratings compared to duration, we can see there is no strong correlation between them, this shows us that with the current users, there is no connection between them. This however is a trend we can monitor with more users and more reviews")

st.subheader("Bar chart of Ratings to Budget")

budget_order = ["Low","Medium","High"]
ratings_budget = (
    unique_movies.groupby("budget_band")
    .agg(
        avg_score =("user_rating", "mean")
    )
    .reset_index()
)
ratings_budget["budget_band"] = pd.Categorical(ratings_budget["budget_band"], categories=budget_order, ordered=True)
ratings_budget_sorted = ratings_budget.sort_values("budget_band")
st.bar_chart(ratings_budget,x="budget_band",y="avg_score")

st.write("Now lets have a look at what we can see when we have a look at budget compared to ratings. As it currently stands, we can see that Medium budget movies have an average higher rating of approximately 0.3 out of 5. This is useful to know, as we can say that reviewers aren't hugely affected by the budget of the film, and this data can be used to show that a higher budget doesn't lead to a better review score")

st.subheader("Bar chart of ratings for each director")

director_ratings = (
    data.groupby("director")
    .agg(avg_rating=("user_rating","mean"))
    .reset_index()  
)
st.bar_chart(director_ratings,x="director",y="avg_rating",x_label="Director",y_label="Average Rating",sort="avg_rating")

st.write("Finally, lets have a look at the ratings for each director. We can see that out top rated director is Andrew Stanton, and out least rated is Bryan Singer. This data is useful to us, as we can monitor trends within this field, and use that to be able to direct users to movies made by better average rated directors in the future")