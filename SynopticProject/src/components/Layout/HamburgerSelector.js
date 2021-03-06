import {shared} from '../../styles/sharedSheet';
import {Alert, View, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setGestureState } from 'react-native-reanimated/lib/reanimated2/NativeMethods';

const  HamburgerSelector = ({size, color, handleClick}) => {
    return (
            <Icon name="bars" size={size} color={color} style={
                { marginRight:20}} onPress={handleClick} /> 
    );
}

export default HamburgerSelector;
