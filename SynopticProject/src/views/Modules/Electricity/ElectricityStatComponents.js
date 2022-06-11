import { shared } from "../../../styles/sharedSheet";
import CurrentUsage from "./Graphs/CurrentUsage";
import CurrentGeneration from "./Graphs/CurrentGeneration";

var usageData = {
  data: [0.6],
};

var generationData = {
  data: [0.6],
};

var generationMax = 1000;
var usageMax = generationData.data * generationMax;

const ElectricityStatComponents = (props) => {
  return (
    <>
      <CurrentUsage marginRight={10} containerPadding={0} data={usageData} containerWidth={80} max={usageMax} unit={'kW'}/>
      <CurrentGeneration marginLeft={10} containerPadding={0} data={generationData} containerWidth={80} max={generationMax} unit={'kW'}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default ElectricityStatComponents;
