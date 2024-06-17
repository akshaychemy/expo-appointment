import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchClinics = () => API.get('/api/clinics');
export const createClinic = (newClinic) => API.post('/api/clinics', newClinic);

export const fetchDoctors = () => API.get('/api/doctors');
export const createDoctor = (newDoctor) => API.post('/api/doctors', newDoctor);
