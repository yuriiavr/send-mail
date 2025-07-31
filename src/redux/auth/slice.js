import { createSlice, createAction } from "@reduxjs/toolkit";

export const updateRefreshToken = createAction('auth/updateRefreshToken');

const initialState = {
  user: { userName: null, email: null, userId: null },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('auth/register/pending', (state) => {
        state.isRefreshing = true;
      })
      .addCase('auth/register/fulfilled', (state, { payload }) => {
        const { accessToken, user, refreshToken } = payload;
        state.user = user;
        state.token = accessToken;
        state.refreshToken = refreshToken;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
      })
      .addCase('auth/register/rejected', (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
      })
      .addCase('auth/login/pending', (state) => {
        state.isRefreshing = true;
      })
      .addCase('auth/login/fulfilled', (state, { payload }) => {
        const { accessToken, email, userName, userId, refreshToken } = payload;
        state.user = { email, userName, userId };
        state.token = accessToken;
        state.refreshToken = refreshToken;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
      })
      .addCase('auth/login/rejected', (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
      })
      .addCase('auth/logout/fulfilled', (state) => {
        state.user = { userName: null, email: null, userId: null };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase('auth/fetchCurrentUser/pending', (state) => {
        state.isRefreshing = true;
      })
      .addCase('auth/fetchCurrentUser/fulfilled', (state, { payload }) => {
        state.user = payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase('auth/fetchCurrentUser/rejected', (state, { payload }) => {
        state.error = payload;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.token = null;
        state.refreshToken = null;
        state.user = { userName: null, email: null, userId: null };
      })
      .addCase(updateRefreshToken, (state, { payload }) => {
        state.refreshToken = payload;
      });
  },
});

export const { reducer: userReducer } = authSlice;
export const selectUserState = (state) => state.user;