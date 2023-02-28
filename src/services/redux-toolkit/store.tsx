import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
export const store = configureStore({
  reducer: combineReducers({
    usersSlice: usersSlice.reducer,
  }),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
