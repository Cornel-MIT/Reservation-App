// screens/AdminDashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AdminDashboardScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]); // List of reservations for the admin's restaurant
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(''); // Store any errors that occur

  // Fetch the reservations that belong to the admin's restaurant
  const fetchReservations = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/api/reservations', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reservations');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.reservationText}>Name: {item.customerName}</Text>
      <Text style={styles.reservationText}>Date: {item.date}</Text>
      <Text style={styles.reservationText}>Time: {item.time}</Text>
      <Button
        title="View Details"
        onPress={() => Alert.alert('Reservation Details', `Details for ${item.customerName}`)} // View reservation details
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="Manage Reservations" onPress={() => navigation.navigate('ManageReservations')} />
      
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={reservations}
          renderItem={renderReservationItem}
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
  reservationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  reservationText: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AdminDashboardScreen;
