import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptreducer from "./gptSlice";
import configReducer from "./configSlice";
import loadingReducer from "./loadingSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptreducer,
    config: configReducer,
    loading: loadingReducer,
  },
});

export default appStore;
