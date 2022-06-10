import { shared } from "../../../styles/sharedSheet";
import ClarityGraph from "./Graphs/ClarityGraph";
import ContentGraph from "./Graphs/ContentGraph";
import PHMeter from "./Graphs/PHMeter";

var clarityData = {
  data: [0.6],
};

var contentData = {
  data: [0.6],
};

const WaterStatComponents = (props) => {
  return (
    <>
      <ContentGraph marginRight={10} containerPadding={0} contentData={contentData} containerWidth={80}/>
      <PHMeter containerWidth={80} containerPadding={0} value={7}/>
      <ClarityGraph marginLeft={10} containerPadding={0} clarityData={clarityData} containerWidth={80}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default WaterStatComponents;
