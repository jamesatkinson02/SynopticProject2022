import { ProgressChart } from "react-native-chart-kit";
import { shared } from "../../../../styles/sharedSheet";

const progressBarConfig ={
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  color: (opacity = 1) => `rgba(52, 149, 235, ${opacity})`,
}

const ClarityGraph = (props) => {
  var size = props.containerWidth - shared.gridItem.padding * 2;
  let r = size * 0.35;

  return (
    <ProgressChart
      width={size}
      height={size}
      strokeWidth={r * 0.35}
      chartConfig={progressBarConfig}
      radius={r}
      data={props.qualityData}
      hideLegend={true}
    />
  );
};

export default ClarityGraph;
