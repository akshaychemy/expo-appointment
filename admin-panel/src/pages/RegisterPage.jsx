import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Ensure `role` state is initialized

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, password, role }); // Ensure `role` is passed in the request body
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Failed to register:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormControl fullWidth required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="superuser">Super User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
