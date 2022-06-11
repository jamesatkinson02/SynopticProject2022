import { ProgressChart } from "react-native-chart-kit";
import { Text, View } from "react-native";
import { shared } from "../../styles/sharedSheet";

const RMProgressChart = (props) => {
  let radius = Math.round(props.width * 0.42);
  let strokeWidth = Math.round(radius * 0.35);

  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      marginRight: props.marginRight || 0,
      marginLeft: props.marginLeft || 0,
    }}>
      <ProgressChart hideLegend={true} radius={radius} strokeWidth={strokeWidth} {...props}/>
      
      {/* Center label */}
      <Text style={[shared.labelText, {
        color: props.labelColour || 'black',
        left: props.width / 2 - radius,
        width: radius * 2,
        fontSize: strokeWidth,
      }]}>{props.label}</Text>
    </View>
  );
};

export default RMProgressChart;
