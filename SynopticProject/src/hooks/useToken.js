import {useState} from 'react';

/* custom hook for accessing the token  */
export default function useToken()
{

    const getToken = () => {
        const tokenStr= sessionStorage.getItem('token');
        const jsonToken = JSON.parse(tokenStr);
        return jsonToken?.token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }

}