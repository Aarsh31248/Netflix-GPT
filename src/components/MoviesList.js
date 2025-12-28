import MoviesCard from "./MoviesCard";

const MoviesList = ({ title, movies }) => {
  return (
    <div className="px-4 ">
      <h1 className="font-bold text-xl md:text-3xl py-4 text-white italic">
        {title}
      </h1>
      <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        <div className="flex">
          {movies?.map((movie) => (
            <MoviesCard key={movie?.id} posterPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
