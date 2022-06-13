import { LineChart } from "react-native-chart-kit";
import { electricityStyles } from "../../../../styles/Modules/electricityStyles";

const legend = "Usage (kWH)";
const chartStyle = electricityStyles.usageChart;

const chartConfig = {
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(100,100,100, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const UsageChart = (props) => {
  let chartData = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        color: (opacity = 1) => `rgba(245, 142, 17, ${opacity})`,
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

export default UsageChart;
