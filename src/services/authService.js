import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Your backend base URL

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};
