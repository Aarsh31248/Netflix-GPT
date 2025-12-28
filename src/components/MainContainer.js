import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { Commet } from "react-loading-indicators";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  
  if (!movies) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Commet color="#ff0000" size="large" />
      </div>
    );
  }

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[45%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
