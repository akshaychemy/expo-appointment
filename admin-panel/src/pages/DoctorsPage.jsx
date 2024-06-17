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
      try {
        const response = await axios.get('http://localhost:5000/api/clinics', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setClinics(response.data);
      } catch (error) {
        console.error('Failed to fetch clinics:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchClinics();
    fetchDoctors();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorImage(file);
  };

  const addDoctor = async () => {
    try {
      const formData = new FormData();
      formData.append('name', doctorName);
      formData.append('image', doctorImage);
      formData.append('description', doctorDescription);
      formData.append('clinic', clinicId);

      const response = await axios.post(
        'http://localhost:5000/api/doctors',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    <div className="container">
      <Typography variant="h4" className="title">
        Doctors
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          required
          className="inputField"
        />
        <TextField
          label="Description"
          value={doctorDescription}
          onChange={(e) => setDoctorDescription(e.target.value)}
          required
          multiline
          rows={4}
          className="inputField"
        />
        <FormControl fullWidth className="inputField">
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
          className="fileInput"
        />
        <Button onClick={addDoctor} className="submitButton">
          Add Doctor
        </Button>
      </form>
      <ul className="doctorList">
        {doctors.map((doctor) => (
          <li key={doctor._id} className="doctorItem">
            <img
              className="doctorImage"
              src={`http://localhost:5000/uploads/${doctor.image}`}
              alt={doctor.name}
            />
            <div className="doctorDetails">
              <Typography variant="subtitle1" className="doctorName">
                {doctor.name}
              </Typography>
              <Typography variant="body2" className="doctorDesc">
                {doctor.description}
              </Typography>
              <Typography variant="body2" className="clinicName">
                Clinic: {doctor.clinic.name}
              </Typography>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .title {
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .inputField {
          width: 100%;
          margin-bottom: 15px;
        }
        .fileInput {
          margin-bottom: 15px;
        }
        .submitButton {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .doctorList {
          list-style-type: none;
          padding: 0;
        }
        .doctorItem {
          display: flex;
          align-items: center;
          padding: 15px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .doctorImage {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 20px;
        }
        .doctorDetails {
          flex: 1;
        }
        .doctorName {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        .doctorDesc {
          color: #555;
          margin-bottom: 10px;
        }
        .clinicName {
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default DoctorsPage;
