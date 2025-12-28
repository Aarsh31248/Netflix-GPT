import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const VideoTitle = ({ title, overview }) => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="w-full aspect-video pt-[7%] md:pt-[13%] md:px-12 px-4 absolute  bg-gradient-to-r from-black">
      <h1 className="md:text-6xl text-2xl text-white font-bold ">{title}</h1>
      <p className="hidden md:inline-block py-6 text-white text-lg w-1/3 text-opacity-35">
        {overview}
      </p>
      <div className="my-2 md:my-0">
        <button className="bg-white text-black md:p-4 p-1 md:px-12 px-4 text-xl rounded-lg font-bold hover:bg-opacity-60">
          {lang[langKey].playButtonText}
        </button>
        <button className="hidden md:inline-block mx-4 bg-black text-white p-4 px-12 text-xl rounded-lg font-bold hover:bg-opacity-60">
          {lang[langKey].moreInfoText}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
