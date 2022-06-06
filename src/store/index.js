import { configureStore } from "@reduxjs/toolkit";

// modules
import homeReducer from "./home";


export const store = configureStore({
  reducer: {
    home: homeReducer
  }
})