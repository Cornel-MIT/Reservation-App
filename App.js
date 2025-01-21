import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Restaurants from './Pages/Resturants';
import Details from './Pages/Details';
import Reserve from './Pages/Reserve';
import LoginScreen from './Pages/LoginScreen';
import SignupScreen from './Pages/Signup';
import UserProfile from './Pages/UserProfileScreen';
import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import SuperAdminDashboard from './Pages/SuperAdminDashboard';
import AssignAdminScreen from './Pages/AssignAdminScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Restaurants" component={Restaurants} />
    <Tab.Screen name="Details" component={Details} />
    <Tab.Screen name="Reserve" component={Reserve} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
        <Stack.Screen name="AssignAdmin" component={AssignAdminScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
