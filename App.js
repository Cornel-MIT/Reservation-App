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
import TableSelection from './Pages/Table';
import GroundFloor from './Pages/GroundFloor';
import FirstFloor from './Pages/FirstFloor';
import SecondFloor from './Pages/SecondFloor';
import Rooftop from './Pages/Rooftop';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Restaurants" component={Restaurants} />
    <Tab.Screen name="Details" component={Details} />
    <Tab.Screen name="Reserve" component={Reserve} />
    <Tab.Screen name="GroundFloor" component={GroundFloor} />
    <Tab.Screen name="FirstFloor" component={FirstFloor} />
    <Tab.Screen name="SecondFloor" component={SecondFloor} />
    <Tab.Screen name="Rooftop" component={Rooftop} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="GroundFloor" component={GroundFloor} />
        <Stack.Screen name="FirstFloor" component={FirstFloor} />
        <Stack.Screen name="SecondFloor" component={SecondFloor} />
        <Stack.Screen name="Rooftop" component={Rooftop} />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CuisineDetails" component={CuisineDetails} />
        <Stack.Screen name="Reserve" component={Reserve} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
        <Stack.Screen name="AssignAdminScreen" component={AssignAdminScreen} />
        <Stack.Screen name="TableSelection" component={TableSelection} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;