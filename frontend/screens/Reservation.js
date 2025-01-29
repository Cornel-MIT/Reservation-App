import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateReservationScreen = ({ navigation }) => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reservationDate, setReservationDate] = useState(new Date());
  const [reservationTime, setReservationTime] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleCreateReservation = async () => {
    if (!guestName || !phone || !reservationDate || !reservationTime || !numberOfGuests) {
      return Alert.alert('All fields except email and special requests are mandatory');
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const date = reservationDate.toISOString().split('T')[0]; // YYYY-MM-DD formatted date
      const time = reservationTime.toTimeString().split(' ')[0]; // HH:MM:SS formatted time
      const response = await axios.post(
        'http://localhost:5000/api/reservations/create',
        { guestName, phone, email, reservationDate: date, reservationTime: time, numberOfGuests, specialRequests },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', `Reservation created successfully with confirmation number: ${response.data.confirmationNumber}`);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Reservation</Text>
      <TextInput
        style={styles.input}
        placeholder="Guest Name"
        value={guestName}
        onChangeText={setGuestName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email (Optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={reservationDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setReservationDate(selectedDate);
            }}
          />
        )}
        <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={reservationTime}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setReservationTime(selectedTime);
            }}
          />
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        value={numberOfGuests}
        onChangeText={setNumberOfGuests}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Special Requests"
        value={specialRequests}
        onChangeText={setSpecialRequests}
      />
      <Button title={loading ? 'Creating...' : 'Create Reservation'} onPress={handleCreateReservation} />
    </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CreateReservationScreen;
