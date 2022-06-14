import { shared } from "../../../styles/sharedSheet";
import CurrentMoisture from "./Graphs/CurrentMoisture";
import PHMeter from "../../../components/Graphs/PHMeter";
import OverallGraph from "./Graphs/OverallGraph";
import { useReducer, useState, useEffect } from "react";
import statReducer from "../../../reducers/statReducer";
import http from "../../../../AxiosConfiguration";

var moistureData = {
  data: [0.6],
};

const CQStatComponents = (props) => {
  const [currentMoisture, setCurrentMoisture] = useState(0);
  const [pHValue, setPHValue] = useState(3);

  useEffect(() => {
    http.post('/crop-quality/current-data', {
      deviceId: '17c1a13a0552aed9'
    }).then(res => {
      setCurrentMoisture(res.data.moisture.data);
      setPHValue(res.data.ph.data);
    });
  }, []);

  let rating = (Math.max(1 - (Math.abs(pHValue - 6.5) / 6.5), 0) + Math.max(1 - (Math.abs(currentMoisture - 0.4) / 0.4), 0)) / 2;

  return (
    <>
      <OverallGraph marginRight={10} containerPadding={0} data={{ data: [rating] }} containerWidth={80} max={100}/>
      <CurrentMoisture marginRight={10} containerPadding={0} data={{ data: [currentMoisture] }} containerWidth={80}/>
      <PHMeter containerWidth={80} containerPadding={0} value={pHValue}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default CQStatComponents;
