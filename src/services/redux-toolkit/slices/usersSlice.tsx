import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  info: [],
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.info = action.payload;
    },
  },
});
