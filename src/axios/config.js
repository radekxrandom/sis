import axios from "axios";

export const mainAxios = axios.create({
  baseURL: "https://recruit.sciencein.software/"
});

export const setToken = token => {
  if (token) {
    const auth = `Bearer ${token}`;
    // Apply authorization token to every request if logged in
    mainAxios.defaults.headers.common.Authorization = auth;
  } else {
    // Delete auth header
    delete mainAxios.defaults.headers.common.Authorization;
  }
};
