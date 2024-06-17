import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Replace with your backend URL

export const getClinics = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
    const response = await axios.get(`${API_BASE_URL}/clinics`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching clinics:', error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
    const response = await axios.get(`${API_BASE_URL}/doctors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
    const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    });
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};
