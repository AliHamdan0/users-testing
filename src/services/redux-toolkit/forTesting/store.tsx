import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { usersSlice } from "../slices/usersSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  usersSlice: usersSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
