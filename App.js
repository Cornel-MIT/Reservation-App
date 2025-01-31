import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Restaurants from './frontend/Pages/Restaurants'; 
import Details from './frontend/Pages/Details';
import Reserve from './frontend/Pages/Reserve';
import UserProfileScreen from './frontend/Pages/UserProfileScreen';

import Home from './frontend/Pages/Home';
import CuisineDetails from './frontend/Pages/cuisineDetails'; 
import CuisineScreen from './frontend/Pages/CuisineScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';

        } else if (route.name === 'Cuisines') {
          iconName = focused ? 'fast-food' : 'fast-food-outline';
        }
        else if (route.name === 'Restaurants') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        }
        else if (route.name === 'UserProfile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6200EE', 
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { paddingBottom: 5, height: 60 },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Cuisines" component={CuisineScreen} />
    <Tab.Screen name="Restaurants" component={Restaurants} />
    <Tab.Screen name="UserProfile" component={UserProfileScreen} />
  </Tab.Navigator>
);

// Stack Navigator
const StackNavigator = () => (
  <Stack.Navigator initialRouteName="HomeTabs">
    <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Restaurants" component={Restaurants} />
    <Stack.Screen name="CuisineDetails" component={CuisineDetails} />
    <Stack.Screen name="Reserve" component={Reserve} />
    <Stack.Screen name="Cuisinescreen" component={CuisineScreen} />
    <Stack.Screen name="Details" component={Details} />


  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;