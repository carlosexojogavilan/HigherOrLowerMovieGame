const RightMovieCard = ({ leftMovieName, rightMovie, nextMovie }) => {
  const handleUserResponse = (userResponse) => {
    nextMovie(userResponse);
  };

  return (
    <div
      className={`w-[50%] h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-opacity-50 transition-all ease-linear duration-700`}
      style={{
        backgroundImage: `url('${rightMovie.primaryImage.url}')`,
      }}
    >
      <div className=" w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-60">
        <h1 className="text-4xl font-bold text-white text-center">
          {rightMovie.titleText.text}
        </h1>
        <h3 className="text-2xl font-bold text-white">was released</h3>
        <div className="flex flex-col gap-4 mt-4 items-center">
          <button
            onClick={() => handleUserResponse("before")}
            className="text-white bg-red-500 px-4 py-2 rounded-md font-semibold"
          >
            &lt; Before
          </button>
          <button
            onClick={() => handleUserResponse("after")}
            className="text-white bg-green-500 px-4 py-2 rounded-md font-semibold"
          >
            After &gt;
          </button>
          <h3 className="text-2xl font-bold text-white">{leftMovieName}</h3>
        </div>
      </div>
    </div>
  );
};

export default RightMovieCard;
