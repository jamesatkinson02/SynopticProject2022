import { ProgressChart } from "react-native-chart-kit";
import { Text, View } from "react-native";
import { shared } from "../../styles/sharedSheet";

const RMProgressChart = (props) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <ProgressChart hideLegend={true} {...props}/>
      
      {/* Center label */}
      <Text style={[shared.labelText, {
        color: props.labelColour || 'black',
        left: props.width / 2 - props.radius,
        width: props.radius * 2,
        fontSize: props.radius * 0.35,
      }]}>{props.label}</Text>
    </View>
  );
};

export default RMProgressChart;
