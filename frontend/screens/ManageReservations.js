import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageReservationsScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/api/reservations/all', {
        headers: { Authorization: `Bearer ${token}` }, // Correct template literal
      });
      setReservations(response.data);
    } catch (err) {
      setError('Failed to load reservations: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleApproveReservation = (id) => {
    Alert.prompt(
      'Approve Reservation',
      'Provide feedback for approval:',
      async (text) => {
        if (!text) return;
        try {
          const token = await AsyncStorage.getItem('userToken');
          await axios.post(
            `http://localhost:5000/api/reservations/approve/${id}`,
            { feedback: text },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Alert.alert('Success', 'Reservation approved successfully');
          fetchReservations();
        } catch (err) {
          setError('Failed to approve reservation: ' + (err.response?.data?.message || err.message));
        }
      }
    );
  };

  const handleDeclineReservation = (id) => {
    Alert.prompt(
      'Decline Reservation',
      'Provide reason for decline:',
      async (text) => {
        if (!text) return;
        try {
          const token = await AsyncStorage.getItem('userToken');
          await axios.post(
            `http://localhost:5000/api/reservations/decline/${id}`,
            { reason: text },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Alert.alert('Success', 'Reservation declined successfully');
          fetchReservations();
        } catch (err) {
          setError('Failed to decline reservation: ' + (err.response?.data?.message || err.message));
        }
      }
    );
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text>{item.guestName}</Text>
      <Text>{item.reservationDate}</Text>
      <Text>{item.reservationTime}</Text>
      <Text>{item.numberOfGuests} guests</Text>
      {item.specialRequests && <Text>Special Requests: {item.specialRequests}</Text>}
      <Text>Status: {item.status}</Text>
      <Button title="Approve" onPress={() => handleApproveReservation(item._id)} />
      <Button title="Decline" onPress={() => handleDeclineReservation(item._id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Reservations</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={reservations}
          renderItem={renderReservationItem}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </View> /* Updated closing tag */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  reservationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ManageReservationsScreen;
