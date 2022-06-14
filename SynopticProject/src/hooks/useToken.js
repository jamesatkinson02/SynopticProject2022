import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

/* custom hook for accessing the token  */
const ContextProvider = ({children}) =>
{
    const [token, setToken] = useState('');
    const [deviceData, setDeviceData] = useState([]);

    const getToken = async () => {
        try{
            const tokenStr = await AsyncStorage.getItem('token');
            const jsonToken = JSON.parse(tokenStr);
            //configure axios headers
            //...
            setToken(jsonToken);
    
        } catch(err)
        {
            console.error(err);
        }
    }

    const saveToken = async (userToken) => {
        try {
            setToken(userToken);
            await AsyncStorage.setItem('token', JSON.stringify(userToken));
            //configure axios headers
            //...
        } catch(err)
        {
            console.error(err);
        }
    }

    const getDeviceData = async () => {
        try {
            let deviceDataStr = await AsyncStorage.getItem('deviceData');
            let deviceData = JSON.parse(deviceDataStr);
            setDeviceData(deviceData);
        } catch(err) {
            console.error(err);
        }
    };

    const saveDeviceData = async (deviceData) => {
        try {
            let deviceDataStr = JSON.stringify(deviceData);
            setDeviceData(deviceData);
            await AsyncStorage.setItem('deviceData', deviceDataStr);
        } catch(err) {
            Promise.error(err);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        getDeviceData();
    }, []);

    return (
        <AuthContext.Provider value = {{token, saveToken, deviceData, saveDeviceData}}>
            {children}
        </AuthContext.Provider>
    )

}
export { AuthContext, ContextProvider };