import React from 'react';
import { View, Text, Button } from 'react-native';

const AdminDashboard = ({ navigation }) => (
  <View>
    <Text>Admin Dashboard</Text>
    <Button title="Go to Restaurants" onPress={() => navigation.navigate('TabNavigator')} />
  </View>
);

export default AdminDashboard;
