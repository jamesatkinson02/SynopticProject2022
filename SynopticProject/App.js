import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./src/views/Login"

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/views/Signup';
import useToken from './src/hooks/useToken'

import InstalledModules from './src/views/InstalledModules';

// Module pages
import WaterPage from './src/views/Modules/Water/WaterPage';

const Stack = createNativeStackNavigator();
export default function App() {

  let {token, setToken} = useToken();

  console.log(token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InstalledModules" component={InstalledModules} />
        <Stack.Screen name="Water" component={WaterPage} />
        <Stack.Screen name="Login">
          {props => <Login {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

