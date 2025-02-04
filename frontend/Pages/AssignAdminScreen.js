import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AssignAdminScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAssignAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://your-backend-url/api/auth/assign-admin', {
        username,
        password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Admin assigned successfully');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Assign General Admin</Text>
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
      <Button title="Assign Admin" onPress={handleAssignAdmin} />
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
});

export default AssignAdminScreen;
