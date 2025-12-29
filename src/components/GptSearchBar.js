import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { addGptMovieResult } from "../utils/Redux/gptSlice";
import { startLoading, stopLoading } from "../utils/Redux/loadingSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      `https://netflix-gpt-backend-xwym.onrender.com/tmdb/search?query=${movie}`
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) return;

    dispatch(startLoading());

    try {
      // 1️⃣ GPT backend call
      const res = await fetch(
        "https://netflix-gpt-backend-xwym.onrender.com/movies",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: searchText.current.value,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("GPT request failed");
      }

      const data = await res.json();

      if (!data.movies) {
        throw new Error("No movies returned by GPT");
      }

      const gptMovies = data.movies.split(",");

      //  TMDB searches
      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTmdb(movie.trim()))
      );

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="pt-[50%] md:pt-[9%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg bg-opacity-90"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9 placeholder:text-sm md:placeholder:text-2xl rounded-lg "
          type="text"
          placeholder={lang[langKey].gptSearchBarPlaceholder}
        />
        <button
          className=" text-xl font-semibold col-span-3 m-4 py-2 md:px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
