import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import resultsReducer from "./resultsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    results: resultsReducer,
  },
});
