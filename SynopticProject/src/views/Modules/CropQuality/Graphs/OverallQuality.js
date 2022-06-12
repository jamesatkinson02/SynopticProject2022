import { View, Image } from "react-native";
import RMText from "../../../../components/Layout/RMText";
import { cqStyles } from "../../../../styles/Modules/cqSheet";

const OverallQuality = (props) => {
  let lowImage = require("../../../../../assets/img/Low_Rating.png");
  let mediumImage = require("../../../../../assets/img/Medium_Rating.png");
  let highImage = require("../../../../../assets/img/High_Rating.png");

  let image = !props.rating && highImage || props.rating > 66 && highImage || props.rating > 33 && mediumImage || lowImage;
  return (
    <View style={cqStyles.overallRating}>
      <Image source={image} style={cqStyles.ratingImg}/>
      <RMText style={cqStyles.ratingText}>Overall rating: {props.rating || "N/A"} / 100</RMText>
    </View>
  );
};

export default OverallQuality;
