// src/utils/api.js
const hostname = window.location.hostname;
const API_BASE = hostname === "localhost"
  ? "http://localhost:5000/api"
  : `http://${hostname}:5000/api`;

export default API_BASE;
