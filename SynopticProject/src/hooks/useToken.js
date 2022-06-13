import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

/* custom hook for accessing the token  */
const ContextProvider = ({children}) =>
{
    const [token, setToken] = useState('');

    const getToken = async () => {
        try{
            const tokenStr= await AsyncStorage.getItem('token');
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
        try{
            await AsyncStorage.setItem('token', JSON.stringify(userToken));
            //configure axios headers
            //...

            setToken(userToken.token);
    
        } catch(err)
        {
            Promise.error(err);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthContext.Provider value = {{token, saveToken}}>
            {children}
        </AuthContext.Provider>
    )

}
export { AuthContext, ContextProvider };