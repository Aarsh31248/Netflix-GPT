import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.config.lang);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0 md:-mt-60 md:pl-8 pl-2 relative z-20">
          <MoviesList title={lang[langKey].nowPlayingText} movies={movies.nowPlayingMovies} />
          <MoviesList title={lang[langKey].topRatedText} movies={movies.topRatedMovies} />
          <MoviesList title={lang[langKey].popularText} movies={movies.popularMovies} />
          <MoviesList title={lang[langKey].upcomingText} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
