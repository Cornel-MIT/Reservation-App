import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login button clicked');
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.1.126:5000/api/auth/login', {
        email,
        password,
      });
  
      const { token, role } = response.data;
  
      if (response.status === 200) {
        console.log('Login successful');
        await AsyncStorage.setItem('token', token); // Store token in AsyncStorage
        await AsyncStorage.setItem('email', email); // Store email in AsyncStorage
  
        switch (role) {
          case 'user':
            navigation.navigate('UserProfile');
            break;
          case 'generalAdmin':
            navigation.navigate('GeneralAdminDashboard');
            break;
          case 'superAdmin':
            navigation.navigate('SuperAdminDashboard');
            break;
          default:
            Alert.alert('Error', 'Invalid role');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        Alert.alert('Login Error', error.response.data.message || 'Something went wrong!');
      } else {
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} disabled={loading} />
          <View style={styles.registerLinkContainer}>
            <Text>Don't have an account? </Text>
            <Text style={styles.registerLink} onPress={() => navigation.navigate('RegisterScreen')}>
              Register here
            </Text>
          </View>
        </>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
