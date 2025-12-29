import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/Redux/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch("https://netflix-gpt-backend-xwym.onrender.com/tmdb/upcoming");

      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies", error);
    }
  };

  useEffect(() => {
    if(!upcomingMovies) getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
