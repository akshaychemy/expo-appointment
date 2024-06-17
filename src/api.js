import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const getClinics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clinics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clinics:', error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};
