import React from 'react';
import { View, Text, Button } from 'react-native';

const SuperAdminDashboard = ({ navigation }) => (
  <View>
    <Text>Super Admin Dashboard</Text>
    <Button title="Go to Restaurants" onPress={() => navigation.navigate('TabNavigator')} />
  </View>
);

export default SuperAdminDashboard;
