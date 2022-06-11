import { shared } from "../../../styles/sharedSheet";
import CurrentMoisture from "./Graphs/CurrentMoisture";
import PHMeter from "../../../components/Graphs/PHMeter";
import OverallGraph from "./Graphs/OverallGraph";

var moistureData = {
  data: [0.6],
};

const CQStatComponents = (props) => {
  return (
    <>
      <OverallGraph marginRight={10} containerPadding={0} data={moistureData} containerWidth={80} max={100}/>
      <CurrentMoisture marginRight={10} containerPadding={0} data={moistureData} containerWidth={80}/>
      <PHMeter containerWidth={80} containerPadding={0} value={7}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default CQStatComponents;
