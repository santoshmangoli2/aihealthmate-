import axios from "axios";
const API = "http://localhost:5000/api/symptoms";

export const checkSymptoms = (text) =>
  axios.post(`${API}/analyze`, { prompt: text });
