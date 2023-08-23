const PointsCounter = ({ points }) => {
  return (
    <p className="text-yellow-500 text-4xl font-semibold absolute bottom-5 left-5">
      Points: {points}
    </p>
  );
};

export default PointsCounter;
