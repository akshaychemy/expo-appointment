import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Appointments</h1>
      <ul className="appointmentList">
        {appointments.map((appointment) => (
          <li key={appointment._id} className="appointmentItem">
            <div className="clinicInfo">
            {/* <img
                className="doctorImage"
                src={`http://localhost:5000/uploads/${appointment.clinic.image}`}
                alt={appointment.selectedDoctor.name}
              /> */}
              <h3 className="clinicName">{appointment.clinic?.name}</h3>
              <p className="info">Date: {appointment.date}</p>
              <p className="info">Time Slot: {appointment.timeSlot}</p>
            </div>
            <div className="doctorInfo">
              <img
                className="doctorImage"
                src={`http://localhost:5000/uploads/${appointment?.selectedDoctor?.image}`}
                alt={appointment?.selectedDoctor?.name}
              />
              <p className="info">Doctor: {appointment?.selectedDoctor?.name}</p>
              <p className="info">Services: {appointment?.selectedService}</p>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 20px auto;
          padding: 0 20px;
        }
        .title {
          font-size: 28px;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .appointmentList {
          list-style-type: none;
          padding: 0;
        }
        .appointmentItem {
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
        }
        .clinicInfo,
        .doctorInfo {
          flex: 1;
        }
        .clinicName {
          margin-bottom: 10px;
        }
        .info {
          margin-bottom: 5px;
          color: #555;
        }
        .doctorImage {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
