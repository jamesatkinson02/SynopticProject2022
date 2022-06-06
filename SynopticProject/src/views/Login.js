import {React, useReducer} from 'react';
import PropTypes from 'prop-types';
import {shared} from '../styles/sharedSheet';
import { textStyles } from '../styles/textSheet';
import {Text, View, Alert,} from 'react-native';
import {loginReducer} from '../reducers/loginReducer';
import {Link} from '@react-navigation/native';

import Card from '../components/Layout/Card';
import RMTextInput from '../components/Inputs/TextInput';
import RMButton from '../components/Inputs/Button';

export default function Login({setToken})
{
    const initialFormState = {
        username: '',
        password:'',
    }
    const [state, dispatch] = useReducer(loginReducer, initialFormState); 

    const changeHandler = (name, e) => {
        dispatch({type: 'FORM INPUT', field: name, payload: e.target.value});
    }
    
    const handleSubmit = () =>  {
        if(!state.username || !state.password)
        {
            Alert.alert("Input Error", "Please enter username and password!");
            return;
        }
        fetch('http://localhost:3000/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({username:state.username, password:state.password})
            
        }).then(resp => resp.json()).then(token => setToken(token));
    }
   
    return (    
        <View style={shared.container}>
            <Text style={[textStyles.header, textStyles.textDark2]}>Login</Text>
            <Card centered={true}>
                <View>
                    <RMTextInput placeholder="Username" onChange={e => {changeHandler('username', e)}} />
                    <RMTextInput placeholder="Password" onChange={e => {changeHandler('password', e)}} secureTextEntry={true}/>
                    <RMButton title="Login" onPress={() => handleSubmit()}/>
                </View>

                <Text style={[textStyles.smallItalic, textStyles.textDark1]}>
                    Don't have an account? <Link style={[textStyles.smallItalic, textStyles.textDark1]} to={{ screen: 'Signup'}}> Sign up here </Link>
                </Text>
            </Card>
        </View>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}