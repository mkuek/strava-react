import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/stravaData";

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});