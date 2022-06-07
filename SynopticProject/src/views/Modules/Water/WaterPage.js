import { Dimensions, View, Text, Image } from "react-native";
import PageWrapper from "../../../components/Layout/PageWrapper";
import Card from "../../../components/Layout/Card";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { Pill, PillSelection } from "../../../components/Inputs/PillSelection";
import { useReducer } from "react";

// Graphs
import ContentChart from "./Graphs/ContentChart";
import PHMeter from "./Graphs/PHMeter";
import ClarityGraph from "./Graphs/ClarityGraph";

// Style sheets
import { shared } from "../../../styles/sharedSheet";
import { waterStyles } from "../../../styles/Modules/waterSheet";
import { textStyles } from "../../../styles/textSheet";
import { useState } from "react";

import waterReducer from "../../../reducers/Modules/waterReducer";

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

const qualityData = {
  // optional
  labels: ["Clarity: "],
 data: [0.6],
};

const WaterPage = () => {
  //const [state, dispatch] = useReducer(waterReducer, {});

  const [pHValue, setpHValue] = useState(7);
  const [chartWrapperWidth, setChartWrapperWidth] = useState(10);
  const [gridItemWrapperWidth, setGridItemWrapperWidth] = useState(150);

  return(
    <PageWrapper title={'Water management'}>
      <Card centered={true} marginTop={30}>
        <View style={waterStyles.glassContainer}>
          <Image source={require("../../../../assets/img/Water.png")} style={waterStyles.water} />
          <Image source={require("../../../../assets/img/Empty_Glass.png")} style={waterStyles.glass} />
        </View>
        
        <Text style={textStyles.textDark}>1000/1000 L</Text>
      </Card>

      <PillSelection marginTop={30} marginBottom={15}>
        <Pill>Daily</Pill>
        <Pill>Weekly</Pill>
        <Pill>Monthly</Pill>
      </PillSelection>

      <Card onLayout={({ nativeEvent }) => setChartWrapperWidth(nativeEvent.layout.width)}>
        <ContentChart containerWidth={chartWrapperWidth} data={contentData}></ContentChart>
      </Card>

      <Grid centered={true}>
        <GridItem onLayout={({ nativeEvent }) => setGridItemWrapperWidth(nativeEvent.layout.width)} containerWidth={gridItemWrapperWidth}>
          <PHMeter containerWidth={gridItemWrapperWidth} value={pHValue}></PHMeter>
        </GridItem>

        <GridItem containerWidth={gridItemWrapperWidth}>
          <ClarityGraph qualityData={qualityData} containerWidth={gridItemWrapperWidth}/>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}

export default WaterPage;
