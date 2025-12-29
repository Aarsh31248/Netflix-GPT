import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/Redux/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies)

  const getPopularMovies = async () => {
    try {
      const data = await fetch("https://netflix-gpt-backend-xwym.onrender.com/tmdb/popular");

      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies", error);
    }
  };

  useEffect(() => {
    if(!popularMovies) getPopularMovies();
  }, []);
};

export default usePopularMovies;
