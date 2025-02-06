import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date of Birth picker

const UserProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    gender: '',
    cellNo: '',
    residentialAddress: '',
    dateOfBirth: new Date()
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token'); 
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        setIsLoggedIn(true);
        const response = await axios.get('https://192.168.1.126:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Failed to load profile. Please try again later.');
        await AsyncStorage.removeItem('token'); // Log out user if token is invalid
        navigation.navigate('LoginScreen');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token'); 
      
      // Basic validation for Date of Birth format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(profile.dateOfBirth)) {
        Alert.alert('Invalid Date', 'Please enter a valid Date of Birth (YYYY-MM-DD).');
        return;
      }

      await axios.put('https://192.168.1.126:5000/api/users/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !isLoggedIn ? (
        <View style={styles.authContainer}>
          <Text style={styles.authMessage}>Hi.. User, you have to Register or Login to update your profile.</Text>
          <View style={styles.buttonContainer}>
            <Button title="Register" onPress={() => navigation.navigate('RegisterScreen')} color="blue" />
            <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} color="green" />
          </View>
        </View>
      ) : isEditing ? (
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={profile.username}
            onChangeText={(text) => handleChange('username', text)}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            editable={false} // Email should not be editable
          />
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={profile.gender}
            onChangeText={(text) => handleChange('gender', text)}
            placeholder="Male/Female/Other"
          />
          <Text style={styles.label}>Cell Number</Text>
          <TextInput
            style={styles.input}
            value={profile.cellNo}
            onChangeText={(text) => handleChange('cellNo', text)}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Residential Address</Text>
          <TextInput
            style={styles.input}
            value={profile.residentialAddress}
            onChangeText={(text) => handleChange('residentialAddress', text)}
          />
          <Text style={styles.label}>Date of Birth</Text>
          <DateTimePicker
            value={profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => handleChange('dateOfBirth', selectedDate || profile.dateOfBirth)}
          />
          <Button title="Save Changes" onPress={handleSubmit} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
        </View>
      ) : (
        <View>
          <Text style={styles.profileText}><Text style={styles.bold}>Username:</Text> {profile.username}</Text>
          <Text style={styles.profileText}><Text style={styles.bold}>Email:</Text> {profile.email}</Text>
          <Text style={styles.profileText}><Text style={styles.bold}>Gender:</Text> {profile.gender}</Text>
          <Text style={styles.profileText}><Text style={styles.bold}>Cell Number:</Text> {profile.cellNo}</Text>
          <Text style={styles.profileText}><Text style={styles.bold}>Residential Address:</Text> {profile.residentialAddress}</Text>
          <Text style={styles.profileText}><Text style={styles.bold}>Date of Birth:</Text> {profile.dateOfBirth}</Text>
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  authContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  authMessage: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default UserProfileScreen;
