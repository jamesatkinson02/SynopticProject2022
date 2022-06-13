import {React, useReducer, useContext} from 'react';
import PropTypes from 'prop-types';
import {shared} from '../styles/sharedSheet';
import { textStyles } from '../styles/textSheet';
import {Text, View, Alert,} from 'react-native';
import {loginReducer} from '../reducers/loginReducer';
import {Link} from '@react-navigation/native';

import Card from '../components/Layout/Card';
import RMTextInput from '../components/Inputs/TextInput';
import RMButton from '../components/Inputs/Button';
import RMText from '../components/Layout/RMText';

import http from '../../AxiosConfiguration';

import {AuthContext, ContextProvider} from '../hooks/useToken'
import { Navigate } from 'react-router-dom';

export default function Login(props)
{
    const { token, saveToken } = useContext(AuthContext);
    const initialFormState = {
        username: '',
        password: '',
    }
    const [state, dispatch] = useReducer(loginReducer, initialFormState); 

    const changeHandler = (name, val) => {
        dispatch({type: 'FORM INPUT', field: name, payload: val});
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
                return;
            }

            saveToken(res.data.token);
            //saveDeviceData(res.data.devices);
       
            props.navigation.navigate('InstalledModules');
            
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

                <RMText style={[textStyles.smallItalic, textStyles.textDark1]}>
                    Don't have an account? <Link style={[textStyles.smallItalic, textStyles.textDark1]} to={{ screen: 'Signup'}}> Sign up here </Link>
                </RMText>
            </Card>
        </View>
    )
}

/*
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
*/