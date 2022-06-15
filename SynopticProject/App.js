import 'react-native-gesture-handler'
import {useState, useContext, useEffect} from 'react';
import { Alert, StyleSheet, Text, View, StatusBar } from 'react-native';

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

import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

import {AuthContext, ContextProvider} from './src/hooks/useToken'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native/Libraries/NewAppScreen';
const Stack = createNativeStackNavigator();

let SignOut = (props) => {
  const { accessToken, saveAccessToken, refreshToken, saveRefreshToken, saveDeviceData } = useContext(AuthContext);

  useEffect(() => {
    saveAccessToken('');
    saveRefreshToken('');
    saveDeviceData([]);
    AsyncStorage.clear();
  }, []);

  return <></>;
}

const App = () => {
  var { accessToken, saveAccessToken } = useContext(AuthContext);
  let [state, setState] = useState(false);

  let [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <></>
  }

  let sidebarHeight = StatusBar.currentHeight + shared.sideBarSheet.paddingTop;
  const initialRouteName = accessToken ? 'InstalledModules' : 'Login';

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: true }}>
        {
          accessToken ? 
          <>
            <Stack.Screen name="InstalledModules" component={InstalledModules} options={{title:'Modules', 
            headerLeft: () => (<HamburgerSelector size={20} color={'black'} handleClick={() => setState(true)}></HamburgerSelector>)}}/>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AddModule" component={AddModule} />
            <Stack.Screen name="SignOut" component={SignOut} />

            {/* Module views */}
            <Stack.Screen name="Water" component={WaterPage} />
            <Stack.Screen name="Electricity" component={ElectricityPage} options={{title: 'Electricity'}} />
            <Stack.Screen name="CropQuality" component={CropQualityPage} options={{title: 'Crop Quality'}}/>
          </> :
          <>
            <Stack.Screen name="Login" options={{headerLeft: () => (<HamburgerSelector size={20} color={'black'} handleClick={() => setState(true)}></HamburgerSelector>)}}>
              {props => <Login {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => <Signup {...props} />}
            </Stack.Screen>
          </>
        }
      </Stack.Navigator>
      

      {state ? <Sidebar style={[shared.sideBarSheet, { paddingTop: Platform.OS === "android" ? sidebarHeight : 0 }]} onClick={() => setState(false)}></Sidebar> : null}
    </NavigationContainer>
  );
}

export default function AppWrapper()
{
  return(
    <ContextProvider>
      <App />  
    </ContextProvider>
  );
}