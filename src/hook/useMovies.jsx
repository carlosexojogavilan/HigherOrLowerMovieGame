import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const url =
      "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=2010&genre=Drama&limit=10&endYear=2020&list=most_pop_movies";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.results);
      if (movies.length !== 0) {
        const newMovies = movies.slice(1);
        setMovies([...newMovies, ...result.results]);
      } else setMovies(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  const reGetMovies = () => {
    getMovies();
  };

  return { movies, setMovies, reGetMovies };
};

export default useMovies;
