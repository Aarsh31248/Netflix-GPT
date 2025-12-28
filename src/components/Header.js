import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/Redux/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/Redux/gptSlice";
import { changeLanguage } from "../utils/Redux/configSlice";
import lang from "../utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-2 py-3  bg-gradient-to-b from-black z-10 flex md:flex-row flex-col justify-between">
      <img className="w-48 mx-auto md:mx-0" src={LOGO} alt="logo" />

      <div className="flex">
        <select
          className="bg-black text-white px-2 mr-4 mb-7 mt-[18px] border rounded-lg hover:bg-gray-900 cursor-pointer"
          onChange={handleLanguageChange}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
        {user && (
          <div className="flex p-4">
            <button
              onClick={handleGptSearchClick}
              className="bg-purple-800 text-white font-semibold px-4 py-1 mr-4 mb-2 rounded-lg hover:bg-opacity-65"
            >
              {showGptSearch
                ? lang[langKey].startWatchingText
                : lang[langKey].gptSearchText}
            </button>
            <img
              className="w-12 h-[52px] md:w-10 md:h-10 rounded-md"
              src={user?.photoURL}
              alt="userIcon"
            />
            <button
              onClick={handleSignOut}
              className="font-bold text-white hover:text-red-800 ml-2 mt-[-12px]"
            >
              {lang[langKey].signOut}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
