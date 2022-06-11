import 'react-native-gesture-handler'
import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Login from "./src/views/Login"

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/views/Signup';
import useToken from './src/hooks/useToken'

import InstalledModules from './src/views/InstalledModules';
import AddModule from './src/views/AddModule';

// Module pages
import WaterPage from './src/views/Modules/Water/WaterPage';
import ElectricityPage from './src/views/Modules/Electricity/ElectricityPage';
import CropQualityPage from './src/views/Modules/CropQuality/CropQualityPage';
import HamburgerSelector from './src/components/Layout/HamburgerSelector';
import PageWrapper from './src/components/Layout/PageWrapper';
import Profile from './src/views/Profile';
import Settings from './src/views/SettingsPage';
import Sidebar from './src/components/Layout/Sidebar';
import { shared } from './src/styles/sharedSheet';

const Stack = createNativeStackNavigator();

export default function App() {

  let {token, setToken} = useToken();
  let [state, setState] = useState(false);

  console.log(token);

  
  return (
    <NavigationContainer>
      <HamburgerSelector size={30} color={'black'} handleClick={() => setState(true)}></HamburgerSelector>
                 
     <Stack.Navigator initialRouteName="InstalledModules" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {props => <Login {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} />
       <Stack.Screen name="InstalledModules" component={InstalledModules} />
        <Stack.Screen name="AddModule" component={AddModule} />

        {/* Module views */}
        <Stack.Screen name="Water" component={WaterPage} />
        <Stack.Screen name="Electricity" component={ElectricityPage} />
        <Stack.Screen name="CropQuality" component={CropQualityPage} />
      </Stack.Navigator>
  {state ? <Sidebar style={shared.sideBarSheet} onClick={() => setState(false)}></Sidebar> : null}
    </NavigationContainer>
  );
}

