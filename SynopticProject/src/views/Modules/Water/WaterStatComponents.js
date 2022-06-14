import { shared } from "../../../styles/sharedSheet";
import ClarityGraph from "./Graphs/ClarityGraph";
import ContentGraph from "./Graphs/ContentGraph";
import PHMeter from "../../../components/Graphs/PHMeter";
import { useState, useEffect } from "react";
import http from "../../../../AxiosConfiguration";

const waterMax = 1000;

const WaterStatComponents = (props) => {
  const [currentContent, setCurrentContent] = useState(0);
  const [currentClarity, setCurrentClarity] = useState(0);
  const [pHValue, setPHValue] = useState(3);

  useEffect(() => {
    http.post('/water/current-data', {
      deviceId: 'f021d188ae2ba5ad'
    }).then(res => {
      setCurrentContent(res.data.content.data / waterMax);
      setCurrentClarity(res.data.clarity.data);
      setPHValue(res.data.ph.data);
    });
  }, []);

  return (
    <>
      <ContentGraph marginRight={10} containerPadding={0} contentData={{ data: [currentContent] }} containerWidth={80} max={waterMax} unit={'L'}/>
      <PHMeter containerWidth={80} containerPadding={0} value={pHValue}/>
      <ClarityGraph marginLeft={10} containerPadding={0} clarityData={{ data: [currentClarity] }} containerWidth={80}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default WaterStatComponents;
