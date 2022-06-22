import { configureStore } from "@reduxjs/toolkit";

// modules
import homeReducer from "./home";
import playerReducer from "./player";
import albumReducer from "./album";


export const store = configureStore({
  reducer: {
    home: homeReducer,
    player: playerReducer,
    album: albumReducer
  }
})