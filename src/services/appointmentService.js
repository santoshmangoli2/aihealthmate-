import axios from "axios";
const API = "http://localhost:5000/api/appointments";

export const bookAppointment = (data) => axios.post(`${API}/book`, data);
export const getPatientAppointments = (patientId) => axios.get(`${API}/patient/${patientId}`);
export const getDoctorAppointments = (doctorId) => axios.get(`${API}/doctor/${doctorId}`);
