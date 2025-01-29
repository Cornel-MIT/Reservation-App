import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const UserDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi User</Text>
      <Button
        title="Make a Reservation"
        onPress={() => navigation.navigate('CreateReservation')}
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
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default UserDashboard;
