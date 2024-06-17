// frontend/components/DoctorsPage.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DoctorsPage = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [doctorImage, setDoctorImage] = useState(null); // State to store image file
  const [doctorDescription, setDoctorDescription] = useState('');

  useEffect(() => {
    const fetchClinics = async () => {
      const response = await axios.get('http://localhost:5000/api/clinics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setClinics(response.data);
    };

    const fetchDoctors = async () => {
      const response = await axios.get('http://localhost:5000/api/doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDoctors(response.data);
    };

    fetchClinics();
    fetchDoctors();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorImage(file);
  };

//   const addDoctor = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', doctorName);
//       formData.append('description', doctorDescription);
//       formData.append('clinic', clinicId);
//       formData.append('image', doctorImage); // Append the file directly to FormData

//       const response = await axios.post(
//         'http://localhost:5000/api/doctors',
//         formData, // Send formData directly as the request body
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data', // Set content type for FormData
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       setDoctors([...doctors, response.data]);
//       setDoctorName('');
//       setClinicId('');
//       setDoctorImage(null);
//       setDoctorDescription('');
//     } catch (error) {
//       console.error('Failed to add doctor:', error);
//     }
//   };

const addDoctor = async () => {
    try {
      const formData = new FormData();
      formData.append('name', doctorName);
      formData.append('image', doctorImage); // Ensure this is correctly set
      formData.append('description', doctorDescription);
      formData.append('clinic', clinicId);
  
      const response = await axios.post(
        'http://localhost:5000/api/doctors',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for FormData
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      setDoctors([...doctors, response.data]);
      setDoctorName('');
      setClinicId('');
      setDoctorImage(null);
      setDoctorDescription('');
    } catch (error) {
      console.error('Failed to add doctor:', error);
    }
  };
  
  

  return (
    <div>
      <Typography variant="h4">Doctors</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={doctorDescription}
          onChange={(e) => setDoctorDescription(e.target.value)}
          required
          multiline
          rows={4}
          style={{ margin: '10px 0' }}
        />
        <FormControl fullWidth>
          <InputLabel id="clinic-select-label">Clinic</InputLabel>
          <Select
            labelId="clinic-select-label"
            value={clinicId}
            onChange={(e) => setClinicId(e.target.value)}
            required
          >
            {clinics.map((clinic) => (
              <MenuItem key={clinic._id} value={clinic._id}>
                {clinic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '10px 0' }}
        />
        <Button onClick={addDoctor}>Add Doctor</Button>
      </form>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            {doctor.name} (Clinic: {doctor.clinic.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsPage;
