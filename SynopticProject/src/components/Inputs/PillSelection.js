import { View, TouchableOpacity, Text } from "react-native";
import { shared } from "../../styles/sharedSheet";
import { textStyles } from "../../styles/textSheet";
import RMText from "../Layout/RMText";

const Pill = (props) => {
  return (
    <TouchableOpacity style={shared.pillContainer} onPress={props.onPress}>
      <View style={[shared.pill, shared.shadow]}>
        <RMText style={[shared.pillText, textStyles.textDark1]}>{props.children}</RMText>
      </View>
    </TouchableOpacity>
  );
};

const PillSelection = (props) => {
  return (
    <View style={[shared.pillSelection, {
      marginTop: props.marginTop || 0,
      marginBottom: props.marginBottom || 0,
    }]}>
      {props.children}
    </View>
  );
};

export { Pill, PillSelection };
