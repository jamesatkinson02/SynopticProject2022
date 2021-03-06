import RMProgressChart from "../../../../components/Graphs/RMProgressChart";
import { shared } from "../../../../styles/sharedSheet";

const progressBarConfig ={
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  color: (opacity = 0.1) => `rgba(50, 170, 180, ${opacity})`,
}

const ClarityGraph = (props) => {
  var size = props.containerWidth - props.containerPadding * 2;

  return (
    <RMProgressChart
      width={size}
      height={size}
      chartConfig={progressBarConfig}
      data={props.clarityData}
      labelColour={'rgb(91, 197, 225)'}
      label={'Clarity'}
      containerPadding={props.containerPadding}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      max={props.max}
      unit={props.unit}
    />
  );
};

export default ClarityGraph;
