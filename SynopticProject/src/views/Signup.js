import {View, Text, TextInput, Button} from 'react-native';
import { shared } from '../styles/sharedSheet';
import { textStyles } from '../styles/textSheet';

import Card from '../components/Layout/Card';
import RMTextInput from '../components/Inputs/TextInput';
import RMButton from '../components/Inputs/Button';
import RMText from '../components/Layout/RMText';

export default function Signup({navigation})
{
    return( 
    <View style={shared.container}>
        <RMText style={[textStyles.header, textStyles.textDark2]}>Sign up</RMText>

        <Card centered={true} marginTop={30}>
            <View>
                <RMTextInput placeholder="Username" />
                <RMTextInput placeholder="Password" secureTextEntry={true}/>
                <RMButton title="Sign up"/>
            </View>
        </Card>
    </View>
    );
}