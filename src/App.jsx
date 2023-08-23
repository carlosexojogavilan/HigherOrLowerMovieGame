import { useEffect, useState } from "react";
import LeftMovieCard from "./components/LeftMovieCard";
import RightMovieCard from "./components/RightMovieCard";
import PointsCounter from "./components/PointsCounter";
import GameOverCard from "./components/GameOverCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [leftMovie, setLeftMovie] = useState({});
  const [rightMovie, setRightMovie] = useState({});
  const [gameStatus, setGameStatus] = useState({ points: 0, gameOver: false });

  const getMovies = async () => {
    const url =
      "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=2010&genre=Drama&limit=10&endYear=2020&list=most_pop_movies";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eb7c0709f9msh33677a073a625a7p11871ajsn4f082da779e6",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    try {
      console.log("Hola");
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.results);
      setLeftMovie(result.results[0]);
      setRightMovie(result.results[1]);
    } catch (error) {
      console.error(error);
    }
  };

  const nextMovie = (playerResponse) => {
    if (
      (leftMovie.releaseDate.year < rightMovie.releaseDate.year &&
        playerResponse === "before") ||
      (leftMovie.releaseDate.year === rightMovie.releaseDate.year &&
        leftMovie.releaseDate.month < rightMovie.releaseDate.month &&
        playerResponse === "before") ||
      (leftMovie.releaseDate.year === rightMovie.releaseDate.year &&
        leftMovie.releaseDate.month === rightMovie.releaseDate.month &&
        leftMovie.releaseDate.day < rightMovie.releaseDate.month &&
        playerResponse === "before") ||
      (leftMovie.releaseYear.year > rightMovie.releaseYear.year &&
        playerResponse === "after") ||
      (leftMovie.releaseDate.year === rightMovie.releaseDate.year &&
        leftMovie.releaseDate.month > rightMovie.releaseDate.month &&
        playerResponse === "after") ||
      (leftMovie.releaseDate.year === rightMovie.releaseDate.year &&
        leftMovie.releaseDate.month === rightMovie.releaseDate.month &&
        leftMovie.releaseDate.day > rightMovie.releaseDate.month &&
        playerResponse === "after")
    ) {
      console.log("Game over");
      setGameStatus({ ...gameStatus, gameOver: true });
    } else {
      if (movies.length >= 2) {
        const newMovies = movies.slice(1);
        setMovies(newMovies);
        setLeftMovie(rightMovie);
        setRightMovie(newMovies[1]);
        setGameStatus({ ...gameStatus, points: gameStatus.points + 1 });
      }
    }
  };

  const retryGame = () => {
    setGameStatus({ points: 0, gameOver: false });
    getMovies();
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-black">
      {movies.length > 0 && !gameStatus.gameOver ? (
        <>
          <LeftMovieCard leftMovie={leftMovie}></LeftMovieCard>
          <div className="w-[1px] bg-slate-400 h-screen"></div>
          <RightMovieCard
            leftMovieName={leftMovie.titleText.text}
            rightMovie={rightMovie}
            nextMovie={nextMovie}
          ></RightMovieCard>
          <PointsCounter points={gameStatus.points}></PointsCounter>
        </>
      ) : (
        <GameOverCard retryGame={retryGame}></GameOverCard>
      )}
    </div>
  );
}

export default App;
