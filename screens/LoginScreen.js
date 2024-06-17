import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios'; // Import Axios library
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log("===>")
      if (username && password) {
        const response = await axios.post('http://localhost:5000/api/login', {
          username,
          password,
        });

        // Assuming your backend returns a JWT token upon successful login
        const token = response.data.token;
        await AsyncStorage.setItem('token', token); // Save token to AsyncStorage

        login(token); // Save token to context or AsyncStorage for future use

        // Navigate to Home screen
        navigation.navigate('Home');
      } else {
        alert('Please enter username and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});
