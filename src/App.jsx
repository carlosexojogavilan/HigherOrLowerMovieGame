import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const url =
      "https://moviesdatabase.p.rapidapi.com/titles?startYear=2000&list=most_pop_movies&endYear=2010&limit=5";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eb7c0709f9msh33677a073a625a7p11871ajsn4f082da779e6",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.results);
      console.log(result.results);
      console.log(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <h1>Higher or Lower Movie Game</h1>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.originalTitleText.text}</h2>
            <img
              src={movie.primaryImage.url}
              alt={movie.originalTitleText.text}
            />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
