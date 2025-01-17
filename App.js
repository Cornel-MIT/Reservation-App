import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TableSelection from "./Pages/TableSelection";
import GroundFloor from "./Pages/Floors/GroundFloor";
import FirstFloor from "./Pages/Floors/FirstFloor";
import SecondFloor from "./Pages/Floors/secondFloor";
import RoofTop from "./Pages/Floors/RoofTop";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TableSelection">
        <Stack.Screen
          name="TableSelection"
          component={TableSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroundFloor"
          component={GroundFloor}
          options={{ title: "Ground Floor" }}
        />
        <Stack.Screen
          name="FirstFloor"
          component={FirstFloor}
          options={{ title: "1st Floor" }}
        />
        <Stack.Screen
          name="SecondFloor"
          component={SecondFloor}
          options={{ title: "2nd Floor" }}
        />
        <Stack.Screen
          name="Rooftop"
          component={RoofTop}
          options={{ title: "RoofTop" }}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
