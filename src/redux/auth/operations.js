import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { apiClient, setAuthToken } from "../../components/api/url";
import { store } from "../store";

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
      const state = store.getState();
      const currentToken = state.user.token;
      
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
      const state = store.getState();
      const persistedToken = state.user.token;

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