import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [rightMovie, setRightMovie] = useState({});

  const getMovies = async () => {
    const url =
      "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=2010&genre=Drama&limit=5&endYear=2020&list=most_pop_movies";
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
      setCurrentMovie(result.results[0]);
      setRightMovie(result.results[1]);
    } catch (error) {
      console.error(error);
    }
  };

  const nextMovie = (playerResponse) => {
    if (
      (currentMovie.releaseYear.year < rightMovie.releaseYear.year &&
        playerResponse === "lower") ||
      (currentMovie.releaseYear.year > rightMovie.releaseYear.year &&
        playerResponse === "higher")
    ) {
      console.log("Game over");
    } else {
      const newMovies = movies.filter(
        (movie) => movie.titleText.text !== currentMovie.titleText.text
      );
      setMovies(newMovies);
      setCurrentMovie(rightMovie);
      setRightMovie(movies[movies.length - 1]);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(currentMovie, rightMovie);

  return (
    <>
      <div className="min-h-screen flex">
        {movies.length > 0 && (
          <>
            <div className="w-[50%] h-screen overflow-hidden bg-slate-400">
              <img
                src={movies.length > 0 && currentMovie.primaryImage.url}
                className="h-full mx-auto"
              ></img>
            </div>
            <div className="w-[50%] h-screen overflow-hidden bg-slate-400">
              <img
                src={movies.length > 0 && rightMovie.primaryImage.url}
                className="h-full mx-auto"
              ></img>
            </div>
            <button onClick={() => nextMovie("higher")}>Higher</button>
            <button onClick={() => nextMovie("lower")}>Lower</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;

// bg-[url(https://m.media-amazon.com/images/M/MV5BMzE0OTcyNDExNF5BMl5BanBnXkFtZTgwMjk5OTU4OTE@._V1_.jpg)]
// bg-[url(https://m.media-amazon.com/images/M/MV5BMTU4MTA5MzA5MF5BMl5BanBnXkFtZTgwNzE4NzA1MTE@._V1_.jpg)]
