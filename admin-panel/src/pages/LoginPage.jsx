import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(username, password);
    navigate('/');
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
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
        <Button onClick={handleLogin}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
