import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

/* custom hook for accessing the token  */
const ContextProvider = ({children}) =>
{
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [deviceData, setDeviceData] = useState([]);
    const [username, setUsername] = useState('');

    const getAccessToken = async () => {
        try{
            const tokenStr= await AsyncStorage.getItem('accessToken');
            const jsonToken = JSON.parse(tokenStr);
            //configure axios headers
            //...
            setAccessToken(jsonToken);
    
        } catch(err)
        {
            console.error(err);
        }
    }

    const saveAccessToken = async (accessToken) => {
        try {
            setAccessToken(accessToken);
            await AsyncStorage.setItem('accessToken', JSON.stringify(accessToken));
            //configure axios headers
            //...
        } catch(err)
        {
            console.error(err);
        }
    }

    const getRefreshToken = async () =>{
        try
        {
            const refreshTokenStr = await AsyncStorage.getItem('refreshToken');
            const refreshTokenJson = JSON.parse(refreshTokenStr);
            setRefreshToken(refreshTokenJson);
    
        } catch(err)
        {
            console.error(err);
        }
    }

    const saveRefreshToken = async (refreshToken) => {
        try{
            setRefreshToken(refreshToken);
            await AsyncStorage.setItem('refreshToken', JSON.stringify(refreshToken));
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

    const getUsername = async (username) => {
        try{
            let usernameStr = await AsyncStorage.getItem('username');
            let usernameData = JSON.parse(usernameStr);
            setUsername(usernameData);
        } catch(err)
        {
            console.error(err);
        }
    }

    const saveUsername = async (username) => {
        try{
            setUsername(username);
            await AsyncStorage.setItem('username', JSON.stringify(username));
        } catch(err)
        {
            console.error(err);
        }
    }

    useEffect(() => {
        getAccessToken();
    }, []);

    useEffect(() => {
        getRefreshToken();
    }, []);


    useEffect(() => {
        getDeviceData();
    }, []);

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <AuthContext.Provider value = {{username, saveUsername, accessToken, saveAccessToken, refreshToken, saveRefreshToken, deviceData, saveDeviceData}}>
            {children}
        </AuthContext.Provider>
    )

}
export { AuthContext, ContextProvider };