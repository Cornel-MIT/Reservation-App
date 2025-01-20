import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import{createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Restaurants from './Pages/Resturants';
import Details from './Pages/Details';
import Reserve from './Pages/Reserve';
import Home from './Pages/Home';
import CuisineDetails from './Pages/cuisineDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const TabNavigator = () => {
    
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="res" component={Restaurants} />
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="cuisinedetails" component={CuisineDetails} />
        <Stack.Screen name="reserve" component={Reserve} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
};

export default App;