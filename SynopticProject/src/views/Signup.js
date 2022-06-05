import {View, Text} from 'react-native';
import { shared } from '../styles/sharedSheet';

export default function Signup({navigation})
{
    return( 
    <View style={shared.container}>
        <Text style={{fontSize:30, color:'grey'}}>Login</Text>
            <View style={shared.borderWrapper}>
                <View>
                    <TextInput style={shared.input} placeholder="Username" />
                    <TextInput style={shared.input} placeholder="Password" secureTextEntry={true} />
                    <Button title="Sign up" ></Button>
                </View>
  
            </View>
    </View>
    );
}