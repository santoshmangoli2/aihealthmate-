import axios from "axios";
const API = "http://localhost:5000/api/healthtips";

export const getAllTips = () => axios.get(API);
export const addTip = (data) => axios.post(API, data);
