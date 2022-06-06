import {View, Text, TextInput, Button} from 'react-native';
import { shared } from '../styles/sharedSheet';
import { textStyles } from '../styles/textSheet';

import Card from '../components/Layout/Card';
import RMTextInput from '../components/Inputs/TextInput';
import RMButton from '../components/Inputs/Button';

export default function Signup({navigation})
{
    return( 
    <View style={shared.container}>
        <Text style={[textStyles.header, textStyles.textDark2]}>Sign up</Text>

        <Card centered={true}>
            <View>
                <RMTextInput placeholder="Username" />
                <RMTextInput placeholder="Password" secureTextEntry={true}/>
                <RMButton title="Sign up"/>
            </View>
        </Card>
    </View>
    );
}