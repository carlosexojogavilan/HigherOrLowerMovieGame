const GameOverCard = ({ retryGame }) => {
  const handleRetryGame = () => {
    retryGame();
  };
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-center gap-4">
      <p className="text-3xl font-semibold">Game Over!</p>
      <div>
        <button
          onClick={handleRetryGame}
          className="bg-green-500 px-4 py-2 rounded-md font-semibold"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default GameOverCard;
