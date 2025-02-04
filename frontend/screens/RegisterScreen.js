import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  

  const handleRegister = async () => {
    console.log('Register button clicked');
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.126:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });
  
      console.log('Response from backend:', response.data);  
      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful. Good luck with your Reservations!!');
        navigation.navigate('LoginScreen');  
      }
    } catch (error) {
      console.error('Registration Error:', error);  
      Alert.alert('Registration Error', error.response?.data?.message || 'Something went wrong!');
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Register" onPress={handleRegister} />
      
      <View style={styles.loginLinkContainer}>
        <Text>Already have an account? </Text>
        <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
          Login here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  loginLinkContainer: {
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
