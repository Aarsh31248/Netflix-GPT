import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Redux/userSlice";
import { LOGIN_BG_IMG, USER_AVATAR } from "../utils/constants";
import lang from "../utils/languageConstants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover  md:h-auto md:object-contain"
          src={LOGIN_BG_IMG}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:w-1/4 w-11/12 absolute  p-12 bg-black my-36 m-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? lang[langKey].signInText : lang[langKey].signUpText}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder={lang[langKey].fullnameText}
            className="p-4 my-2 w-full bg-gray-700 bg-opacity-30 rounded-lg placeholder:text-white placeholder:font-semibold"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder={lang[langKey].emailText}
          className="p-4 my-2 w-full bg-gray-700 bg-opacity-30 rounded-lg placeholder:text-white placeholder:font-semibold"
        />
        <input
          ref={password}
          type="text"
          placeholder={lang[langKey].passwordText}
          className="p-4 my-2 w-full bg-gray-700 bg-opacity-30 rounded-lg placeholder:text-white placeholder:font-semibold"
        />
        <p className="text-lg font-bold text-red-600">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-4 my-8 hover:bg-[#C11119] bg-[#E50914] w-full rounded-lg font-bold"
        >
          {isSignInForm ? lang[langKey].signInText : lang[langKey].signUpText}
        </button>
        <p className="p-4">
          {isSignInForm
            ? lang[langKey].newToNetflixText 
            : lang[langKey].alreadyRegisteredText}
          <span
            className="hover:text-red-600 cursor-pointer font-bold ml-2"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? lang[langKey].signUpNowText
              : lang[langKey].signInNowText}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
