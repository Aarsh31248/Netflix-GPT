import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/Redux/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector(
    (store) => store.movies.trailerVideo
  );

  // Fetching the Trailer video and updating the store with trailer video data
  const getMovieVideo = async () => {
    const data = await fetch(`https://netflix-gpt-backend-xwym.onrender.com/tmdb/${movieId}/trailer`);

    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
   if(!trailerVideo) getMovieVideo();
  }, []);
};
export default useMovieTrailer;
