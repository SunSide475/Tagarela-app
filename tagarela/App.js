import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register"; 
import Settings from "./src/screens/Settings/Settings";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
  
        <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}