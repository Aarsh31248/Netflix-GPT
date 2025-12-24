import { IMG_CDN_URL } from "../utils/constants";

const MoviesCard = ({ posterPath }) => {
  return (
    <div className="flex-shrink-0 w-40 mr-4">
      <img
        className="w-full rounded-lg transition-transform duration-300 ease-out hover:scale-95  cursor-pointer"
        src={IMG_CDN_URL + posterPath}
        alt="Movie Card"
      />
    </div>
  );
};

export default MoviesCard;
