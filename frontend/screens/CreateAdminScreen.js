import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAdminScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const handleCreateAdmin = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem('userToken');
    const role = 'generalAdmin'; // Set role to generalAdmin by default
    
    // Log the data
    console.log({ username, email, password, role, token });

    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      { username, email, password, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Alert.alert('Success', 'Admin created successfully');
    navigation.goBack(); // Navigate back to the Super Admin Dashboard
  } catch (err) {
    setError('Failed to create admin');
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Admin</Text>
      {error && <Text style={styles.error}>{error}</Text>}

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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Creating...' : 'Create Admin'} onPress={handleCreateAdmin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default CreateAdminScreen;
