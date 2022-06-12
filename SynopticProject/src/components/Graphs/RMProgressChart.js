import { ProgressChart } from "react-native-chart-kit";
import { Text, View } from "react-native";
import { shared } from "../../styles/sharedSheet";
import RMText from "../Layout/RMText";

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
      <View style={[shared.progressChartLabel, {
        left: props.width / 2 - radius,
        width: radius * 2,
      }]}>
        <RMText style={[shared.labelText, {
          color: props.labelColour || 'black',
          fontSize: strokeWidth * 0.8,
        }]}>{props.label}</RMText>

        <RMText style={[shared.labelText, {
          color: props.labelColour || 'black',
          fontSize: strokeWidth * 0.7,
        }]}>{props.max ? `${Math.round(props.data.data * props.max)}/${props.max}` : `${props.data.data * 100}%` }</RMText>

        { props.unit && 
          <RMText style={[shared.labelText, {
            color: props.labelColour || 'black',
            fontSize: strokeWidth * 0.7,
          }]}>{props.unit}</RMText>
        }
      </View>
    </View>
  );
};

export default RMProgressChart;
