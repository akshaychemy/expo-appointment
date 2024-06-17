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
  const [clinicServices, setClinicServices] = useState(''); // State to store services

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
      formData.append('services', clinicServices); // Append services to FormData

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
      setClinicServices(''); // Reset services field
    } catch (error) {
      console.error('Failed to add clinic:', error);
    }
  };

  return (
    <div className="container">
      <Typography variant="h4" className="title">Clinics</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Clinic Name"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          required
          className="inputField"
        />
        <TextField
          label="Description"
          value={clinicDescription}
          onChange={(e) => setClinicDescription(e.target.value)}
          required
          multiline
          rows={4}
          className="inputField"
        />
        <TextField
          label="Services (comma separated)"
          value={clinicServices}
          onChange={(e) => setClinicServices(e.target.value)}
          required
          className="inputField"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="fileInput"
        />
        <Button onClick={addClinic} className="submitButton">Add Clinic</Button>
      </form>
      <ul className="clinicList">
        {clinics?.map((clinic) => (
          <li key={clinic._id} className="clinicItem">
            
            <div className="clinicName">{clinic.name}</div>
            <div className="clinicDescription">{clinic.description}</div>
            <div className="clinicServices">{clinic.services.join(', ')}</div> {/* Display services */}
            <div className="clinicImageContainer">
              <img
                src={`http://localhost:5000/uploads/${clinic.image}`}
                alt={clinic.name}
                className="clinicImage"
              />
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
        .clinicList {
          list-style-type: none;
          padding: 0;
        }
        .clinicItem {
          margin-bottom: 20px;
          padding: 15px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .clinicName {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }
        .clinicDescription {
          margin-bottom: 10px;
          color: #555;
        }
        .clinicServices {
          margin-bottom: 10px;
          color: #777;
        }
        .clinicImageContainer {
          text-align: center;
        }
        .clinicImage {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default ClinicsPage;
