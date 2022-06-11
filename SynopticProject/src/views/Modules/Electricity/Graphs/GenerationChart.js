import { LineChart } from "react-native-chart-kit";
import { waterStyles } from "../../../../styles/Modules/waterSheet";

const legend = "Production (kWH)";
const chartStyle = waterStyles.graph;

const chartConfig = {
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(64,64,64, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const GenerationChart = (props) => {
  let chartData = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        color: (opacity = 1) => `rgba(41,144,203, ${opacity})`,
        strokeWidth: 3
      }
    ],
    legend: [legend]
  };

  return (
    <LineChart
      data={chartData}
      width={props.containerWidth - (props.containerPadding * 2)}
      height={220}
      chartConfig={chartConfig}
      style={chartStyle}
    />
  );
};

export default GenerationChart;
