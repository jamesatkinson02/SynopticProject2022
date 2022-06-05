import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* custom hook for accessing the token  */
export default function useToken()
{

    const getToken = async () => {
        const tokenStr= await AsyncStorage.getItem('token');
        const jsonToken = JSON.parse(tokenStr);
        return jsonToken?.token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = async userToken => {
        await AsyncStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }

}