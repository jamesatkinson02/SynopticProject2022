import RMProgressChart from "../../../../components/Graphs/RMProgressChart";
import { shared } from "../../../../styles/sharedSheet";

const progressBarConfig ={
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  color: (opacity = 1) => `rgba(250, 157, 50, ${opacity})`,
}

const CurrentGeneration = (props) => {
  var size = props.containerWidth - props.containerPadding * 2;
  
  return (
    <RMProgressChart
      width={size}
      height={size}
      chartConfig={progressBarConfig}
      data={props.data}
      labelColour={'rgb(250, 157, 50)'}
      label={'Production'}
      containerPadding={props.containerPadding}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      max={props.max}
      unit={props.unit}
    />
  );
};

export default CurrentGeneration;