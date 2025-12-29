import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/Redux/moviesSlice";
import { startLoading, stopLoading } from "../utils/Redux/loadingSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    dispatch(startLoading());

    try {
      const data = await fetch(
        "https://netflix-gpt-backend-xwym.onrender.com/tmdb/now-playing"
      );

      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies", error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []);
};

export default useNowPlayingMovies;
