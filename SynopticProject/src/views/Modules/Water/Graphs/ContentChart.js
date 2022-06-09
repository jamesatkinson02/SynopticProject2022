import { LineChart } from "react-native-chart-kit";
import { waterStyles } from "../../../../styles/Modules/waterSheet";
import { shared } from "../../../../styles/sharedSheet";

const chartConfig = {
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(64,64,64, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const ContentChart = (props) => {
  return (
    <LineChart
      data={props.data}
      width={props.containerWidth - (shared.card.padding * 2)}
      height={220}
      chartConfig={chartConfig}
      style={waterStyles.graph}
    />
  );
};

export default ContentChart;
