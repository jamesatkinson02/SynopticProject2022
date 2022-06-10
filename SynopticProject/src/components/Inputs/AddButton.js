import { TouchableOpacity, View, Text } from "react-native";

import { shared } from "../../styles/sharedSheet";
import { textStyles } from "../../styles/textSheet";
import RMText from "../Layout/RMText";

const AddButton = (props) => {
  return (
    <TouchableOpacity style={shared.addButtonContainer} onPress={props.onPress}>
      <View style={[shared.addButton, shared.shadow]}>
        <RMText style={[shared.addButtonText, textStyles.textDark1]}>{props.children}</RMText>
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
