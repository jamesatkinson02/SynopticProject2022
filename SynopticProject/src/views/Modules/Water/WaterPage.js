import PageWrapper from "../../../components/Layout/PageWrapper";
import Card from "../../../components/Layout/Card";
import { Dimensions, View, Text, Image } from "react-native";

import ContentChart from "./Graphs/ContentChart";

import { shared } from "../../../styles/sharedSheet";
import { waterStyles } from "../../../styles/Modules/waterSheet";
import { textStyles } from "../../../styles/textSheet";
import { useState } from "react";

const contentData = {
  labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [200, 450, 280, 800, 990, 430, 560],
      color: (opacity = 1) => `rgba(41,144,203, ${opacity})`, // optional
      strokeWidth: 3 // optional
    }
  ],
  legend: ["Water (L)"] // optional
};

const WaterPage = () => {
  const [chartWidth, setChartWidth] = useState(0);

  return(
    <PageWrapper title={'Water management'}>
      <Card centered={true}>
        <View style={waterStyles.glassContainer}>
          <Image source={require("../../../../assets/img/Water.png")} style={waterStyles.water} />
          <Image source={require("../../../../assets/img/Empty_Glass.png")} style={waterStyles.glass} />
        </View>
        
        <Text style={textStyles.textDark}>1000/1000 L</Text>
      </Card>

      <Card onLayout={({ nativeEvent }) => setChartWidth(nativeEvent.layout.width)}>
        <ContentChart containerWidth={chartWidth} data={contentData}></ContentChart>
      </Card>
    </PageWrapper>
  );
}

export default WaterPage;
