import { TouchableOpacity, View, Text } from "react-native";

import { shared } from "../../styles/sharedSheet";
import { textStyles } from "../../styles/textSheet";

const AddButton = (props) => {
  return (
    <TouchableOpacity style={shared.addButtonContainer} onPress={props.onPress}>
      <View style={[shared.addButton, shared.shadow]}>
        <Text style={[shared.addButtonText, textStyles.textDark1]}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
