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
import Home from './Pages/Home';
import CuisineDetails from './Pages/cuisineDetails';
import Table from './Pages/Table';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="res" component={Restaurants} />
    <Tab.Screen name="Details" component={Details} />
    <Tab.Screen name="Reserve" component={Reserve} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="table">
        <Stack.Screen name="res" component={Restaurants} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="cuisineDetails" component={CuisineDetails} />
        <Stack.Screen name="Reserve" component={Reserve} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
        <Stack.Screen name="AssignAdminScreen" component={AssignAdminScreen} />
        <Stack.Screen name="table" component={Table} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;