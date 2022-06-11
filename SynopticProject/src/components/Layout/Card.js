import { shared } from "../../styles/sharedSheet"
import { View } from "react-native";

const Card = (props) => {
  return (
    <View
      style={[shared.card, shared.shadow, {
        alignItems: `${ props.centered ? 'center' : 'flex-start' }`,
        marginTop: props.marginTop || 0,
        marginBottom: props.marginBottom || 0,
        padding: props.padding || shared.card.padding,
      }]}
      onLayout={props.onLayout}
      >
      {props.children}
    </View>
  );
}

export default Card;
