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



st.subheader('Raw data')
st.write(data)

genre_counts = (
    data.groupby('genre')['user_id']
    .count()
    .reset_index(name='count')
)
st.subheader("The number of reviews sorted by genre")
st.bar_chart(genre_counts, x='genre', y='count')

unique_movies = data.drop_duplicates(subset='movie_name')

genre_counts = (
    unique_movies.groupby('genre')['user_id']
    .count()
    .reset_index(name='count')
)
st.subheader("The number of unique movies with reviews sorted by genre")
st.bar_chart(genre_counts, x='genre', y='count')

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

st.subheader("The Duration of genres")

genre_duration =(
    unique_movies.groupby("genre")
    .agg(
        duration =("runtime_minutes", "mean")
    )
    .sort_values("duration", ascending = True)
    .reset_index()
)
st.bar_chart(genre_duration,x="genre",y="duration")

st.subheader("Correlation of ratings to duration")

duration_avg_rating =(
    data.groupby("movie_name")
    .agg(
        avg_score = ("user_rating","mean"),
        duration =("runtime_minutes", "mean")
    )
)

st.scatter_chart(duration_avg_rating, x="duration",y="avg_score")

st.subheader("Correlation of ratings to budget")

order = ["Low","Medium","High"]
ratings_budget = (
    unique_movies.groupby("budget_band")
    .agg(
        avg_score =("user_rating", "mean")
    )
    .reset_index()
)
st.bar_chart(ratings_budget,x="budget_band",y="avg_score")

st.subheader("Correlation of ratings for each director")

director_ratings = (
    data.groupby("director")
    .agg(avg_rating=("user_rating","mean"))
    .reset_index()
)
st.bar_chart(director_ratings,x="director",y="avg_rating")