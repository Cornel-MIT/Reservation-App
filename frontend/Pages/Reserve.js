import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { initStripe, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const Reserve = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // Initialize Stripe
  React.useEffect(() => {
    initStripe({
      publishableKey: 'stripe_publishable_key ', 
    });
  }, []);

  const handleReservation = async () => {
    if (!name || !date || !time) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      // Step 1: Create a payment intent on your backend
      const response = await axios.post('http://192.168.30.79:5000/api/create-payment-intent', {
        amount: 1000, // R10.00 in Rands I guess
        currency: 'zar',
      });

      const { clientSecret } = response.data;

      // Step 2: Initialize the payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Your Restaurant Name', 
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      // Step 3: Present the payment sheet and hopfully it works
      const { paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment successful! Reservation confirmed.');
        setName('');
        setDate('');
        setTime('');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while processing your payment.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Reservation</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reserve;