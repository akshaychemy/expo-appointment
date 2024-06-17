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

  useEffect(() => {
    const fetchClinics = async () => {
      const response = await axios.get('/api/clinics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setClinics(response.data);
    };

    const fetchDoctors = async () => {
      const response = await axios.get('/api/doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDoctors(response.data);
    };

    fetchClinics();
    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    try {
      const response = await axios.post(
        '/api/doctors',
        { name: doctorName, clinic: clinicId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setDoctors([...doctors, response.data]);
      setDoctorName('');
      setClinicId('');
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
        <Button onClick={addDoctor}>Add Doctor</Button>
      </form>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>{doctor.name} (Clinic: {doctor.clinic.name})</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsPage;
