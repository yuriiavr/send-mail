import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { apiClient, setAuthToken } from "../../components/api/url";

export const updateAccessToken = createAction('auth/updateAccessToken');
export const updateRefreshToken = createAction('auth/updateRefreshToken');

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiClient.post("/auth/register", credentials);
      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiClient.post("/auth/login", credentials);
      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentToken = state.user.accessToken;
      
      await apiClient.post("/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      setAuthToken(null);
      localStorage.clear();
    } catch (error) {
      setAuthToken(null);
      localStorage.clear();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.user.accessToken;

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("No token found");
      }

      setAuthToken(persistedToken);
      const { data } = await apiClient.get("/auth/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentRefreshToken = state.user.refreshToken;

      if (!currentRefreshToken) {
        return thunkAPI.rejectWithValue("No refresh token found");
      }

      const { data } = await apiClient.post("/auth/refreshToken", { refreshToken: currentRefreshToken });

      setAuthToken(data.accessToken);

      return data;
    } catch (error) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);