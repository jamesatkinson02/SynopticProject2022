import { shared } from "../../../styles/sharedSheet";
import CurrentUsage from "./Graphs/CurrentUsage";
import CurrentGeneration from "./Graphs/CurrentGeneration";
import { electricityStyles } from "../../../styles/Modules/electricityStyles";
import { useEffect, useState } from "react";
import http from "../../../../AxiosConfiguration";

const generationMax = 5000;

const ElectricityStatComponents = (props) => {
  const [currentUsage, setCurrentUsage] = useState(0);
  const [currentGeneration, setCurrentGeneration] = useState(1);

  let updateData = () => {
    http.post('/electricity/current-data', {
      deviceId: props.deviceId
    }).then(res => {
      setCurrentUsage(res.data.usage.data);
      setCurrentGeneration(res.data.generation.data);
    });
  };

  useEffect(() => {
    updateData();

    props.navigation.addListener('focus', () => {
      updateData();
    });
  }, []);

  return (
    <>
      <CurrentUsage containerPadding={0} data={currentUsage} containerWidth={80} max={currentGeneration} unit={'kWH'}/>
      <CurrentGeneration marginLeft={10} containerPadding={0} data={currentGeneration} containerWidth={80} max={generationMax} unit={'kWH'}/>
      {/* <ContentGraph containerPadding={0} contentData={contentData} containerWidth={80}/> */}
    </>
  );
};

export default ElectricityStatComponents;
