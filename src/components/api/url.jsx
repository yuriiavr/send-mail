import axios from "axios";
import { logoutUser, updateAccessToken, updateRefreshToken } from "../../redux/auth/operations";
import { BASE_URL } from "./api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

let isInterceptorsSetup = false;

export const setupInterceptors = (store) => {
  if (isInterceptorsSetup) {
    return;
  }

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._isRetry && originalRequest.url !== '/auth/refreshToken') {
        originalRequest._isRetry = true;
        try {
          const state = store.getState();
          const currentRefreshToken = state.user.refreshToken;

          if (!currentRefreshToken) {
            store.dispatch(logoutUser());
            return Promise.reject(error);
          }
          
          // Assuming the refresh token is sent in the body of the request
          const { data } = await apiClient.post("/auth/refreshToken", { refreshToken: currentRefreshToken });
          
          setAuthToken(data.accessToken);

          // Dispatch the correct actions to update the store with both new tokens
          store.dispatch(updateAccessToken({ accessToken: data.accessToken }));
          store.dispatch(updateRefreshToken(data.refreshToken));

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          store.dispatch(logoutUser());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  isInterceptorsSetup = true;
};