import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.219:5000/api/auth/login', { email, password });
      const { token, userRole } = response.data;

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', userRole);

      navigation.replace(userRole === 'superadmin' ? 'SuperAdminDashboard' : 'AdminDashboard');  // Navigate based on role
    } catch (error) {
      Alert.alert('Login Error', error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      
      <Button title="Login" onPress={handleLogin} />
      
      <View style={styles.registerLinkContainer}>
        <Text>Don't have an account? </Text>
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Register here
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
  registerLinkContainer: {
    marginTop: 20,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
