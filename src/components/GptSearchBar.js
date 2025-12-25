import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)

  return (
    <div className="pt-[9%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg bg-opacity-90">
        <input
          className="p-4 m-4 col-span-9 placeholder:text-2xl rounded-lg "
          type="text"
          placeholder={lang[langKey].gptSearchBarPlaceholder}
        />
        <button className=" text-xl font-semibold col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
