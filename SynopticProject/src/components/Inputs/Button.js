import { Text, TouchableOpacity, View } from 'react-native';
import { shared } from '../../styles/sharedSheet';
import { textStyles } from '../../styles/textSheet';
import RMText from '../Layout/RMText';

// props.colour = Green, Blue, Red, Orange
const RMButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ marginTop: props.marginTop || 0, marginBottom: props.marginBottom || 0 }}>
      <View style={[shared.button, shared[`button${props.colour || "Blue"}`]]}>
        <RMText style={[shared.buttonText, textStyles.textLight]}>{props.title}</RMText>
      </View>
    </TouchableOpacity>
  );
}

export default RMButton;
