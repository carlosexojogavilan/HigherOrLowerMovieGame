import { useState } from "react";
import LeftMovieCard from "./components/LeftMovieCard";
import RightMovieCard from "./components/RightMovieCard";
import PointsCounter from "./components/PointsCounter";
import GameOverCard from "./components/GameOverCard";
import rightOptionSound from "./assets/interface-124464.mp3";
import wrongOptionSound from "./assets/wrong-answer-126515.mp3";
import useMovies from "./hook/useMovies";

function App() {
  const { movies, setMovies, reGetMovies } = useMovies();
  const [gameStatus, setGameStatus] = useState({ points: 0, gameOver: false });

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  const checkPlayerResponse = (leftMovie, rightMovie, playerResponse) => {
    const leftDate = new Date(
      leftMovie.releaseDate.year,
      leftMovie.releaseDate.month,
      leftMovie.releaseDate.day
    );
    const rightDate = new Date(
      rightMovie.releaseDate.year,
      rightMovie.releaseDate.month,
      rightMovie.releaseDate.day
    );

    if (playerResponse === "before" && leftDate > rightDate) return true;
    if (playerResponse === "after" && leftDate < rightDate) return true;
    return false;
  };

  const nextMovie = (playerResponse) => {
    const isCorrectResponse = checkPlayerResponse(
      movies[0],
      movies[1],
      playerResponse
    );

    if (isCorrectResponse) {
      playSound(rightOptionSound);
      setGameStatus({ ...gameStatus, points: gameStatus.points + 1 });

      const newMovies = movies.slice(1);
      if (newMovies.length <= 2) {
        reGetMovies();
      } else setMovies(newMovies);
      console.log(newMovies, "final ronda");
    } else {
      playSound(wrongOptionSound);
      setGameStatus({ ...gameStatus, gameOver: true });
    }
  };

  const retryGame = () => {
    setGameStatus({ points: 0, gameOver: false });
    if (movies.length > 2) setMovies(() => movies.slice(1));
    else reGetMovies();
  };

  return (
    <div className="relative h-screen md:min-h-screen flex flex-col md:flex-row justify-center items-center bg-black">
      {movies.length > 0 && !gameStatus.gameOver ? (
        <>
          <LeftMovieCard leftMovie={movies[0]}></LeftMovieCard>
          <div className="w-full md:w-[1px] bg-slate-400 h-[1px] md:h-screen"></div>
          <div className="p-8 rounded-full bg-white text-3xl absolute z-10 font-semibold border-[1px] border-slate-400">
            VS
          </div>
          <RightMovieCard
            leftMovieName={movies[0]?.titleText.text}
            rightMovie={movies[1]}
            nextMovie={nextMovie}
          ></RightMovieCard>
          <PointsCounter points={gameStatus.points}></PointsCounter>
        </>
      ) : (
        <GameOverCard
          retryGame={retryGame}
          finalPoints={gameStatus.points}
        ></GameOverCard>
      )}
      <div className="text-yellow-500 text-2xl font-semibold absolute bottom-5 right-5">
        Made by Carlos Exojo
      </div>
    </div>
  );
}

export default App;
