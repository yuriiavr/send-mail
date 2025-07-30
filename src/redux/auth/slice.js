import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
} from "./operations";

const initialState = {
  user: { userName: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshig: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { token } = payload;

      state.user = payload;
      state.token = token;
      state.isLoggedIn = true;
      state.error = null;
      state.isRefreshig = false;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { token } = payload;

      state.user = payload;
      state.token = token;
      state.isLoggedIn = true;
      state.error = null;
      state.isRefreshig = false;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isRefreshig = true;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isRefreshig = true;
    });

    builder.addCase(loginUser.rejected, (state, payload) => {
      state.error = payload.error;
      state.isRefreshig = false;
    });

    builder.addCase(registerUser.rejected, (state, payload) => {
      state.error = payload.error;
      state.isRefreshig = false;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isRefreshig = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      window.location.reload();
    });

    builder.addCase(fetchCurrentUser.fulfilled, (state) => {
      state.isLoggedIn = true;
      state.isRefreshig = false;
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isRefreshig = true;
    });

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.isRefreshig = false;
    });
  },
});

export default authSlice.reducer;

export const selectUserState = (state) => state.user;
