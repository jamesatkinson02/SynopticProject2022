import RMProgressChart from "../../../../components/Graphs/RMProgressChart";
import { shared } from "../../../../styles/sharedSheet";

const progressBarConfig ={
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  color: (opacity = 1) => `rgba(52, 149, 235, ${opacity})`,
}

const ClarityGraph = (props) => {
  var size = props.containerWidth - props.containerPadding * 2;
  let r = size * 0.35;

  return (
    <RMProgressChart
      width={size}
      height={size}
      strokeWidth={r * 0.35}
      chartConfig={progressBarConfig}
      radius={r}
      data={props.clarityData}
      labelColour={'rgb(52, 149, 235)'}
      label={'Clarity'}
      containerPadding={props.containerPadding}
    />
  );
};

export default ClarityGraph;
