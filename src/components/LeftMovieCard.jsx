const LeftMovieCard = ({ leftMovie }) => {
  return (
    <div
      className="relative w-full md:w-[50%] h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-opacity-50 transition-all ease-linear duration-700"
      style={{
        backgroundImage: `url('${leftMovie.primaryImage.url}')`,
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-60">
        <h1 className="text-4xl font-bold text-white text-center">
          {leftMovie.titleText.text}
        </h1>
        <h3 className="text-2xl font-bold text-white">was released in</h3>
        <p className="text-4xl font-bold text-yellow-500">
          {leftMovie.releaseDate.day}/{leftMovie.releaseDate.month}/
          {leftMovie.releaseDate.year}
        </p>
      </div>
    </div>
  );
};

export default LeftMovieCard;
