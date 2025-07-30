import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, refresh } from "../../components/api/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      const { data } = response;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      const { data } = response;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userToken = state.auth.token;

      if (!userToken) {
          throw new Error("No authentication token found for logout.");
      }

      await logout(userToken);
      return;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Logout failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userToken = state.auth.token;

      if (!userToken) {
        return thunkAPI.rejectWithValue("No token available.");
      }

      const response = await refresh(userToken);
      const { data } = response;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Failed to fetch current user";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);