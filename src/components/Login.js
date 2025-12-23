import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6d631aa6-567d-46ef-a644-b5b00e4334d2/web/IN-en-20251215-TRIFECTA-perspective_f1cab02a-e42b-4913-a7d9-c5fe0f94f68d_large.jpg"
          alt="logo"
        />
      </div>
      <form className="w-1/4 absolute  p-12 bg-black my-36 m-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <button className="p-4 my-6 bg-red-600 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-4">
          {isSignInForm ? "New To Netflix?" : "Already Registered?"}
          <span
            className="hover:text-red-600 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " Sign Up Now" : " Sign In Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
