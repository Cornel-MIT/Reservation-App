import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <Button
        title="Manage Reservations"
        onPress={() => navigation.navigate('ManageReservation')}
        style={styles.button}
      />
      <Button
        title="Manage Restaurants"
        onPress={() => navigation.navigate('ManageRestaurants')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginBottom: 15,
  },
});

export default AdminDashboardScreen;
