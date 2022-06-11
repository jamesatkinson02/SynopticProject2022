import RMProgressChart from "../../../../components/Graphs/RMProgressChart";
import { shared } from "../../../../styles/sharedSheet";

const progressBarConfig ={
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  color: (opacity = 1) => `rgba(52, 149, 235, ${opacity})`,
}

const ContentGraph = (props) => {
  var size = props.containerWidth - props.containerPadding * 2;
  
  return (
    <RMProgressChart
      width={size}
      height={size}
      chartConfig={progressBarConfig}
      data={props.contentData}
      labelColour={'rgb(52, 149, 235)'}
      label={'Content'}
      containerPadding={props.containerPadding}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      max={props.max}
      unit={props.unit}
    />
  );
};

export default ContentGraph;
