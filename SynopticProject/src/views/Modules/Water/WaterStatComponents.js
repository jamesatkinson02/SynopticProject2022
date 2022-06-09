import ClarityGraph from "./Graphs/ClarityGraph";

const clarityData = {
  data: [0.6],
};

const WaterStatComponents = (props) => {
  return (
    <>
      <ClarityGraph clarityData={clarityData} containerWidth={100}/>
    </>
  );
};

export default WaterStatComponents;
