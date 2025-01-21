import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
         
      
      const { user, token } = response.data;
      // Save token as needed, for example in AsyncStorage (not shown here)
      setError('');
      switch (user.role) {
        case 'super_admin':
          navigation.navigate('SuperAdminDashboard');
          break;
        case 'general_admin':
          navigation.navigate('AdminDashboard');
          break;
        default:
          navigation.navigate('UserDashboard');
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>No account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  link: {
    marginTop: 12,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
