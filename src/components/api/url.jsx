import axios from "axios";
import { logoutUser } from "../../redux/auth/operations";
import { API_ENDPOINTS } from "./api";

const BASE_URL = API_ENDPOINTS.backup;

export const apiClient = axios.create({
  baseURL: BASE_URL,
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

          const { data } = await apiClient.post("/auth/refreshToken");
          setAuthToken(data.accessToken);

          store.dispatch({
            type: "auth/updateToken",
            payload: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
          });

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