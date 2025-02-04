import React from 'react';
import { View, Text, Button } from 'react-native';

const UserDashboard = ({ navigation }) => (
  <View>
    <Text>User Dashboard</Text>
    <Button title="Go to Restaurants" onPress={() => navigation.navigate('TabNavigator')} />
  </View>
);

export default UserDashboard;
