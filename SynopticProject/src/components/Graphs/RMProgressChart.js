import { ProgressChart } from "react-native-chart-kit";
import { Text } from "react-native";
import { shared } from "../../styles/sharedSheet";

const RMProgressChart = (props) => {
  return (
    <>
      <ProgressChart hideLegend={true} {...props}/>
      
      {/* Center label */}
      <Text style={[shared.labelText, {
        color: props.labelColour || 'black',
        left: (props.width / 2),
      }]}>{props.label}</Text>
    </>
  );
};

export default RMProgressChart;
