import { shared } from "../../../styles/sharedSheet";
import ClarityGraph from "./Graphs/ClarityGraph";

const clarityData = {
  data: [0.6],
};

const WaterStatComponents = (props) => {
  return (
    <>
      <ClarityGraph containerPadding={0} clarityData={clarityData} containerWidth={100}/>
    </>
  );
};

export default WaterStatComponents;
