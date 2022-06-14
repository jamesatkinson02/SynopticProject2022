import {React, useReducer, useContext} from 'react';
import PropTypes from 'prop-types';
import {shared} from '../styles/sharedSheet';
import { textStyles } from '../styles/textSheet';
import {Text, View, Alert,} from 'react-native';
import formReducer from '../reducers/formReducer';
import {Link} from '@react-navigation/native';

import Card from '../components/Layout/Card';
import RMTextInput from '../components/Inputs/TextInput';
import RMButton from '../components/Inputs/Button';
import RMText from '../components/Layout/RMText';
import FormError from '../components/Layout/FormError';

import http from '../../AxiosConfiguration';

import {AuthContext, ContextProvider} from '../hooks/useToken'
import { Navigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props)
{
    const {username, saveUsername, accessToken, saveAccessToken, refreshToken, saveRefreshToken, deviceData, saveDeviceData } = useContext(AuthContext);
    const initialFormState = {
        username: '',
        password: '',
    }
    const [state, dispatch] = useReducer(formReducer, initialFormState); 

    const changeHandler = (name, val) => {
        dispatch({type: 'FORM INPUT', field: name, payload: val});
    }

    const errorHandler = (err) => {
        dispatch({ type: 'FORM ERROR', error: err });
    }
    
    // const handleSubmit = () =>  {
    //     if(!state.username || !state.password)
    //     {
    //         Alert.alert("Input Error", "Please enter username and password!");
    //         return;
    //     }
    //     fetch('http://localhost:3000/login', {
    //         method:'POST',
    //         headers:{
    //             'Content-Type': 'application/json',
    //         },
    //         body:JSON.stringify({username:state.username, password:state.password})
            
    //     }).then(resp => resp.json()).then(token => setToken(token));
    // }

    const handleSubmit = () => {
        // Validation here

        http.post('/accounts/login', {
            username: state.username,
            password: state.password
        }).then(res => {
            console.log(res.data)

            if (res.data.err) {
                errorHandler(res.data.err);
                return;
            }

            saveAccessToken(res.data.accessToken);
            saveRefreshToken(res.data.refreshToken);
            saveDeviceData(res.data.devices || []);
            saveUsername(res.data.username);
       
           // props.navigation.navigate('InstalledModules');
        });
    };
   
    return (
        <View style={shared.container}>
            <RMText style={[textStyles.header, textStyles.textDark2]}>Login</RMText>

            <Card centered={true} marginTop={30}>
                <View>
                    <RMTextInput placeholder="Username" onChangeText={v => changeHandler('username', v)} />
                    <RMTextInput placeholder="Password" onChangeText={v => changeHandler('password', v)} secureTextEntry={true}/>
                    <RMButton title="Login" onPress={() => handleSubmit()}/>
                </View>

                <RMText style={[textStyles.textDark1, { marginTop: 10 }]}>
                    Don't have an account? <Link style={[textStyles.textDark1, { color: '#2555f5' }]} to={{ screen: 'Signup'}}> Sign up here </Link>
                </RMText>
                
                { state.error ? <FormError>{state.error}</FormError> : <></> }
            </Card>
        </View>
    )
}

/*
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
*/