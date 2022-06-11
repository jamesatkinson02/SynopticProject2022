import { shared } from "../../styles/sharedSheet"
import { View } from "react-native";

const Grid = (props) => {
  return (
    <View
      style={[shared.grid, { alignItems: `${ props.centered ? 'center' : 'flex-start' }` }]}
      onLayout={props.onLayout}
      >
      {props.children}
    </View>
  );
}

const GridItem = (props) => {
  return (
    <View
      style={[shared.gridItem, { height: props.containerWidth, marginTop: props.marginTop || 0, marginBottom: props.marginBottom || 30 }]}
      onLayout={props.onLayout}
      >
      {props.children}
    </View>
  );
}

export { Grid, GridItem };
