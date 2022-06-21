import { configureStore } from "@reduxjs/toolkit";

// modules
import homeReducer from "./home";
import playerReducer from "./player";


export const store = configureStore({
  reducer: {
    home: homeReducer,
    player: playerReducer,
  }
})