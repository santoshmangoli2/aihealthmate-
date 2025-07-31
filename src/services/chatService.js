import axios from "axios";
const API = "http://localhost:5000/api/chat";

export const sendMessage = (data) => axios.post(`${API}/send`, data);
export const getMessages = (senderId, receiverId) =>
  axios.get(`${API}/messages?sender=${senderId}&receiver=${receiverId}`);
