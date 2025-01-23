import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UserProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [fullName, setFullName] = useState('');
  const [cellNo, setCellNo] = useState('');
  const [otherProfileInfo, setOtherProfileInfo] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/profile', {
        fullName,
        cellNo,
        otherProfileInfo
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully');
      navigation.navigate('UserDashboard');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Update Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Cell No"
        value={cellNo}
        onChangeText={setCellNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Other Profile Info"
        value={otherProfileInfo}
        onChangeText={setOtherProfileInfo}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
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

export default UserProfile;
