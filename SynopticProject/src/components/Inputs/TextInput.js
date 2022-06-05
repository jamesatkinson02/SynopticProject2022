import { useLinkProps } from '@react-navigation/native';
import {TextInput} from 'react-native';
import {shared} from '../../styles/sharedSheet';
const TextInput = (props) => {
  return (
    <TextInput style={shared.input} placeholder={props.placeholder} onChange = {props.onChange} {...props} />
  );
}

export default TextInput;
