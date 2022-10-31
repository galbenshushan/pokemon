import { createSlice } from "@reduxjs/toolkit";
import {
  deleteFromLocalStorage,
  getItemFromLocalStorage,
} from "../helpers/localStorage";
const user = getItemFromLocalStorage("user") || {};
const isAuth = getItemFromLocalStorage("isAuth") || "";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: user,
    isAuth: isAuth,
  },
  reducers: {
    startAuthSession(state, action) {
      state.user = {
        _id: action.payload._id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        role: action.payload.role,
        token: action.payload.token,
      };
      state.isAuth = true;
    },
    destroyAuthSession(state) {
      state.user = {
        _id: null,
        first_name: null,
        last_name: null,
        email: null,
        role: null,
        token: null,
      };
      state.isAuth = false;
      deleteFromLocalStorage("isAuth");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
