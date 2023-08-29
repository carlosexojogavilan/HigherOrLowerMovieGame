import React from "react";
import FailGif from "../assets/giphy.gif";

const GameOverCard = ({ retryGame, finalPoints }) => {
  const handleRetryGame = () => {
    retryGame();
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${FailGif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-60">
        <div className=" p-12 flex flex-col items-center gap-4 bg-opacity-50">
          <p className="text-5xl font-semibold text-white">Game Over!</p>
          <p className="text-xl font-semibold text-white text-center">
            You scored:{" "}
            <p className="text-yellow-500 text-center text-6xl">
              {finalPoints}
            </p>
            points!
          </p>
          <div>
            <button
              onClick={handleRetryGame}
              className="bg-transparent border-2 text-white px-4 py-2 rounded-md font-semibold hover:bg-white  hover:text-black"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverCard;
