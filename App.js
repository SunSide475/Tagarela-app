import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register"; 
import Home from "./src/screens/Home/Home";
import Settings from "./src/screens/Settings/Settings";
import TestCard from "./src/screens/TestCard/TestCard";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='TestCard' component={TestCard} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
        <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}