import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ClinicsPage = () => {
  const { user } = useAuth();
  const [clinics, setClinics] = useState([]);
  const [clinicName, setClinicName] = useState('');
  const [clinicImage, setClinicImage] = useState(null); // State to store image file
  const [clinicDescription, setClinicDescription] = useState('');

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('/api/clinics', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setClinics(response.data);
      } catch (error) {
        console.error('Failed to fetch clinics:', error);
      }
    };

    fetchClinics();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setClinicImage(file);
  };

  const addClinic = async () => {
    try {
      const formData = new FormData();
      formData.append('name', clinicName);
      formData.append('description', clinicDescription);
      formData.append('image', clinicImage); // Append image file to FormData

      const response = await axios.post(
        'http://localhost:5000/api/clinics',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setClinics([...clinics, response.data]);
      setClinicName('');
      setClinicImage(null);
      setClinicDescription('');
    } catch (error) {
      console.error('Failed to add clinic:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Clinics</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Clinic Name"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={clinicDescription}
          onChange={(e) => setClinicDescription(e.target.value)}
          required
          multiline
          rows={4}
          style={{ margin: '10px 0' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '10px 0' }}
        />
        <Button onClick={addClinic}>Add Clinic</Button>
      </form>
      <ul>
        {/* {clinics?.map((clinic) => (
          <li key={clinic._id}>
            <div>{clinic.name}</div>
            <div>{clinic.description}</div>
            <div>
              <img src={clinic.image} alt={clinic.name} style={{ maxWidth: '200px' }} />
            </div>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default ClinicsPage;
