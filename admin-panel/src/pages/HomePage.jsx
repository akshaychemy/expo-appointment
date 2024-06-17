import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have authentication
          },
        });
        setAppointments(response.data); // Assuming response.data is an array of appointments
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <h3>{appointment.title}</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Doctor: {appointment.doctor.name}</p>
            {/* Additional fields as per your appointment schema */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
