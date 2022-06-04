import { shared } from "../../styles/sharedSheet"
import { View } from "react-native";

const Card = (props) => {
  return (
    <View
      style={{ ...shared.card, alignItems: `${ props.centered ? 'center' : 'flex-start' }` }}
      onLayout={props.onLayout}
      >
      {props.children}
    </View>
  );
}

export default Card;
