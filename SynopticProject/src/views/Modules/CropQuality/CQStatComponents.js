import { shared } from "../../../styles/sharedSheet";
import CurrentMoisture from "./Graphs/CurrentMoisture";
import PHMeter from "../../../components/Graphs/PHMeter";
import OverallGraph from "./Graphs/OverallGraph";
import { useReducer } from "react";
import statReducer from "../../../reducers/statReducer";

var moistureData = {
  data: [0.6],
};

const CQStatComponents = (props) => {
  const [state, dispatch] = useReducer(statReducer, {
    currentMoisture: { data: [0.6] },
    pHValue: 7,
  });

  let rating = (Math.max(1 - (Math.abs(state.pHValue - 6.5) / 6.5), 0) + Math.max(1 - (Math.abs(state.currentMoisture.data - 0.4) / 0.4), 0)) / 2;

  return (
    <>
      <OverallGraph marginRight={10} containerPadding={0} data={{ data: [rating] }} containerWidth={80} max={100}/>
      <CurrentMoisture marginRight={10} containerPadding={0} data={state.currentMoisture} containerWidth={80}/>
      <PHMeter containerWidth={80} containerPadding={0} value={state.pHValue}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default CQStatComponents;
