import fetchWithFallback from './fetchWithFallback';

export const login = (credentials, token) => {
  return fetchWithFallback('post', 'auth/login', credentials, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const register = (credentials) => {
  return fetchWithFallback('post', 'auth/signup', credentials);
};

export const refresh = (token) => {
  return fetchWithFallback('get', 'auth/current', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logout = (token) => {
  return fetchWithFallback('get', 'auth/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};