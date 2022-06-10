import { textStyles } from "../../styles/textSheet";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const RMText = (props) => {
  let globalStyle = {
    fontFamily: 'Lato-Regular',
  };

  const style = StyleSheet.flatten([
    props.style,
    globalStyle,
  ]);

  return (
    <Text style={style}>{props.children}</Text>
  );
}

export default RMText;
