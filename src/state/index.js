import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  admin: null,
  adminToken: null,
};

const slice = createSlice({
  initialState,
  name: "mode",
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAdminLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.adminToken = action.payload.adminToken;
    },
    setAdminLogout: (state, action) => {
      state.admin = null;
      state.adminToken = null;
    },
    setUserCart: (state, action) => {
      state.user.cart = action.payload.cart;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setAdminLogin,
  setAdminLogout,
  setUserCart,
  setUser,
} = slice.actions;

export default slice.reducer;
