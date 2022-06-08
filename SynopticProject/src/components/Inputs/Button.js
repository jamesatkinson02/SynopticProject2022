import { Text, TouchableOpacity, View } from 'react-native';
import { shared } from '../../styles/sharedSheet';
import { textStyles } from '../../styles/textSheet';

// props.colour = Green, Blue, Red, Orange
const RMButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[shared.button, shared[`button${props.colour || "Blue"}`]]}>
        <Text style={[shared.buttonText, textStyles.textLight]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default RMButton;
