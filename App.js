import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './frontend/screens/LoginScreen';
import RegisterScreen from './frontend/screens/RegisterScreen';
import AdminDashboardScreen from './frontend/screens/AdminDashboardScreen';
import SuperAdminDashboardScreen from './frontend/screens/SuperAdminDashboardScreen';
import CreateAdminScreen from './frontend/screens/CreateAdminScreen';
import UserDashboard from './frontend/screens/DashboardScreen';
import Reservations from './frontend/screens/Reservation';
import ManageReservationsScreen from './frontend/screens/ManageReservations';
// import ManageRestaurantsScreen from './frontend/screens/ManageRestaurantsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigationRef = useRef(null); 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('userRole');
        
        if (token && role) {
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoading && navigationRef.current) {
      if (isAuthenticated) {
        if (userRole === 'superadmin') {
          navigationRef.current.navigate('SuperAdminDashboard');
        } else if (userRole === 'generalAdmin') {
          navigationRef.current.navigate('AdminDashboard');
        }
        else if (userRole === 'user') {
          navigationRef.current.navigate('UserDashboard');
        }
      } else {
        navigationRef.current.navigate('Login');
      }
    }
  }, [isLoading, isAuthenticated, userRole]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboardScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="CreateAdmin" component={CreateAdminScreen} />
        <Stack.Screen name="CreateReservation" component={Reservations} />
        <Stack.Screen name="ManageReservation" component={ManageReservationsScreen} />
        {/* <Stack.Screen name="ManageRestaurants" component={ManageRestaurantsScreen} /> Added screen */}
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
