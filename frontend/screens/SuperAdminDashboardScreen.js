// screens/SuperAdminDashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SuperAdminDashboardScreen = ({ navigation }) => {
  const [admins, setAdmins] = useState([]); // To store the list of general admins
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(''); // To store any errors

  // Fetch general admins (you can extend this to fetch restaurants or other data)
  const fetchAdmins = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/api/admins', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load admins');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle creating a new general admin
  const handleCreateAdmin = () => {
    navigation.navigate('CreateAdmin'); // Navigate to the screen where super admin can create new admins
  };

  const renderAdminItem = ({ item }) => (
    <View style={styles.adminItem}>
      <Text style={styles.adminText}>{item.username}</Text>
      <Button
        title="View Details"
        onPress={() => Alert.alert('Admin Details', `Details for ${item.username}`)} // Display admin details (can be extended)
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Super Admin Dashboard</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="Create New Admin" onPress={handleCreateAdmin} />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={admins}
          renderItem={renderAdminItem}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adminItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  adminText: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SuperAdminDashboardScreen;
