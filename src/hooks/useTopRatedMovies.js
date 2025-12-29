import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/Redux/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch("https://netflix-gpt-backend-xwym.onrender.com/tmdb/top-rated");

      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies", error);
    }
  };

  useEffect(() => {
    if(!topRatedMovies) getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
