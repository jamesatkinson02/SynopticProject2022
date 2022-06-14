import RMProgressChart from "../../../../components/Graphs/RMProgressChart";
import { shared } from "../../../../styles/sharedSheet";
import { textStyles } from "../../../../styles/textSheet";
import { View, Image } from "react-native";
import { electricityStyles } from "../../../../styles/Modules/electricityStyles";
import RMText from "../../../../components/Layout/RMText";

const CurrentGeneration = (props) => {
  const aspectRatio = 282/560;
  var size = props.containerWidth - props.containerPadding * 2;

  let height = size * 0.8;
  let width = height * aspectRatio;

  let fillRatio = props.data / 5000;
  
  return (
    <View style={[electricityStyles.electricityGraphContainer, { width: size, height: size }]}>
      <RMText style={[electricityStyles.graphLabel, textStyles.textDark2, { fontSize: size / 100 * 12, marginBottom: 5, }]}>Production</RMText>

      <View style={[electricityStyles.stencilContainer, { width: width, height: height }]}>
        <Image source={require("../../../../../assets/img/Electricity_Background.png")}
          style={[electricityStyles.electricityBg, { width: width, height: height }]} />

        <Image source={require("../../../../../assets/img/Electricity_Fill.png")}
          style={[electricityStyles.electricityFill, { top: height - height * fillRatio, width: width, height: height }]} />

        <Image source={require("../../../../../assets/img/Electricity_Stencil.png")}
          style={[electricityStyles.stencil, { width: width, height: height }]} />
      </View>

      <RMText style={[electricityStyles.graphLabel, { color: '#fcc03f', fontSize: size / 100 * 10 }]}>{props.data} / 5000 kWH</RMText>
    </View>
  );
};

export default CurrentGeneration;
