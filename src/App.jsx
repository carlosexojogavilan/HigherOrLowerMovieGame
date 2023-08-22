import { useEffect, useState } from "react";

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
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.results);
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

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="min-h-screen flex bg-black">
        {movies.length > 0 && (
          <>
            <div
              className={`w-[50%] h-screen overflow-hidden relative bg-cover bg-center bg-no-repeat bg-opacity-50 relative`}
              style={{
                backgroundImage: `url('${leftMovie.primaryImage.url}')`,
              }}
            >
              <div className="h-full w-full bg-black bg-opacity-60 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white text-center">
                  {leftMovie.titleText.text}
                </h1>
                <h3 className="text-2xl font-bold text-white">
                  was released in
                </h3>
                <p className="text-4xl font-bold text-yellow-500">
                  {leftMovie.releaseDate.day}/{leftMovie.releaseDate.month}/
                  {leftMovie.releaseDate.year}
                </p>
              </div>
              <p className="text-yellow-500 text-4xl font-semibold absolute bottom-5 left-5">
                Points: {gameStatus.points}
              </p>
            </div>
            <div className="w-1 bg-slate-400 h-screen"></div>
            <div
              className={`w-[50%] h-screen overflow-hidden relative bg-cover bg-center bg-no-repeat bg-opacity-50`}
              style={{
                backgroundImage: `url('${rightMovie.primaryImage.url}')`,
              }}
            >
              <div className="h-full w-full bg-black bg-opacity-60 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white text-center">
                  {rightMovie.titleText.text}
                </h1>
                <h3 className="text-2xl font-bold text-white">was released</h3>
                <div className="flex flex-col gap-4 mt-4 items-center">
                  <button
                    onClick={() => nextMovie("after")}
                    className="text-white bg-green-500 px-4 py-2 rounded-md font-semibold"
                  >
                    After
                  </button>
                  <button
                    onClick={() => nextMovie("before")}
                    className="text-white bg-red-500 px-4 py-2 rounded-md font-semibold"
                  >
                    Before
                  </button>
                  <h3 className="text-2xl font-bold text-white">
                    {leftMovie.titleText.text}
                  </h3>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
