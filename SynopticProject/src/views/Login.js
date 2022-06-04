import {React, useReducer} from 'react';
import {shared} from '../styles/sharedSheet';
import {Text, View, Button, TextInput, Alert} from 'react-native';
import {loginReducer} from '../reducers/loginReducer';
import {Link} from '@react-navigation/native';
export default function Login({navigation})
{
    const initialFormState = {
        username: '',
        password:'',
    }
    const [state, dispatch] = useReducer(loginReducer, initialFormState); 

    const changeHandler = e => {
        dispatch({type: 'FORM INPUT', field: e.target.name, payload: e.target.value});
    }
    
    const handleSubmit = async e => {
      
    }
   
    return (
        <View style={shared.container}>
        <Text style={{fontSize:30, color:'grey'}}>Login</Text>
        <View style={shared.borderWrapper}>
          <View onSubmit={handleSubmit}>
            <TextInput style={shared.input} placeholder="Username" onChange={e => {changeHandler}} />
            <TextInput style={shared.input} type="password" placeholder="Password" onChange={e => {changeHandler}} secureTextEntry={true}/>
            <Button title="Login" onPress={() => Alert.alert("Login!")}></Button>
          </View>
          <Text style={shared.smallItalics}> Don't have an account? <Link style={shared.smallItalics} to={{ screen: 'Signup'}}>
      Sign up here
    </Link>
</Text>
      
        </View>
        </View>
    )
}