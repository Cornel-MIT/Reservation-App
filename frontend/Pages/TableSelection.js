import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroundFloor from "./GroundFloor";
import FirstFloor from "./FirstFloor";
import SecondFloor from "./SecondFloor";
import Rooftop from "./Rooftop";

const Tab = createMaterialTopTabNavigator();

const TableSelection = () => {
  return (
    <View style={{ flex: 1 }}>
      
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFF',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: {
            backgroundColor: '#8A1538'
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#FFF',
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen name="GroundFloor" component={GroundFloor} options={{ tabBarLabel: 'Ground Floor' }} />
        <Tab.Screen name="FirstFloor" component={FirstFloor} options={{ tabBarLabel: '1st Floor' }} />
        <Tab.Screen name="SecondFloor" component={SecondFloor} options={{ tabBarLabel: '2nd Floor' }} />
        <Tab.Screen name="Rooftop" component={Rooftop} options={{ tabBarLabel: 'Rooftop' }} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3F0",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default TableSelection;