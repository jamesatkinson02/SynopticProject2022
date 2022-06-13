import {View, Text, TextInput, Button} from 'react-native';
import { shared } from '../styles/sharedSheet';
import { textStyles } from '../styles/textSheet';

import Card from '../components/Layout/Card';
import RMTextInput from '../components/Inputs/TextInput';
import RMButton from '../components/Inputs/Button';
import RMText from '../components/Layout/RMText';
import FormError from '../components/Layout/FormError';

import http from '../../AxiosConfiguration';
import formReducer from '../reducers/formReducer';
import { useReducer } from 'react';

import { AuthContext } from '../hooks/useToken';
import { useContext } from 'react';

export default function Signup(props)
{
    const { token, saveToken, deviceData, saveDeviceData } = useContext(AuthContext);

    const initialFormState = {
        username: '',
        fname: '',
        lname: '',
        phone: '',
        password: '',
        confirm: '',
    };
    const [state, dispatch] = useReducer(formReducer, initialFormState); 

    const changeHandler = (name, val) => {
        dispatch({type: 'FORM INPUT', field: name, payload: val});
    }

    const errorHandler = (err) => {
        dispatch({ type: 'FORM ERROR', error: err });
    }

    const submit = () => {
        http.post('/accounts/sign-up', {
            username: state.username,
            fname: state.fname,
            lname: state.lname,
            phone: state.phone,
            password: state.password,
        }).then(res => {
            console.log(res.data)

            if (res.data.err) {
                errorHandler(res.data.err);
                return;
            }

            saveToken(res.data.token);
            saveDeviceData([]);
        });
    };

    return(
    <View style={shared.container}>
        <RMText style={[textStyles.header, textStyles.textDark2]}>Sign up</RMText>

        <Card centered={true} marginTop={30}>
            <View>
                <RMTextInput placeholder="Username" onChangeText={v => changeHandler('username', v)}/>
                <RMTextInput placeholder="First name" onChangeText={v => changeHandler('fname', v)}/>
                <RMTextInput placeholder="Last name" onChangeText={v => changeHandler('lname', v)}/>
                <RMTextInput placeholder="Phone number" onChangeText={v => changeHandler('phone', v)}/>
                <RMTextInput placeholder="Password" secureTextEntry={true} onChangeText={v => changeHandler('password', v)}/>
                <RMTextInput placeholder="Confirm password" secureTextEntry={true} onChangeText={v => changeHandler('confirm', v)}/>
                <RMButton title="Sign up" onPress={submit}/>

                { state.error ? <FormError>{state.error}</FormError> : <></> }
            </View>
        </Card>
    </View>
    );
}