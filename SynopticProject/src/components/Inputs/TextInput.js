import { useLinkProps } from '@react-navigation/native';
import {TextInput} from 'react-native';
import {shared} from '../../styles/sharedSheet';

const RMTextInput = (props) => {
  return (
    <TextInput style={shared.textInput} {...props} />
  );
}

export default RMTextInput;
