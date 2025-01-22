import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './frontend/screens/LoginScreen';
import RegisterScreen from './frontend/screens/RegisterScreen';
import AdminDashboardScreen from './frontend/screens/AdminDashboardScreen';
import SuperAdminDashboardScreen from './frontend/screens/SuperAdminDashboardScreen';
import CreateAdminScreen from './frontend/screens/CreateAdminScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('userRole');
        
        if (token) {
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}>
        {/* If not authenticated, show Login and Register screens */}
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // If authenticated, show Dashboard screens based on role
          <>
            {userRole === 'superadmin' && (
              <>
                <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboardScreen} />
                <Stack.Screen name="CreateAdmin" component={CreateAdminScreen} />
              </>
            )}
            {userRole === 'admin' && (
              <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
