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

const WaterPage = () => {
  const [state, dispatch] = useReducer(waterReducer, {
    data: {
      pHValue: 7,
      clarityData: { data: [0.6] },
      currentContent: 650,
      maxContent: 1000,
      contentData: [200, 450, 280, 800, 990, 430, 560],
      contentFrequency: 'Daily',
    },
    layout: {
      chartWrapperWidth: 10,
      gridItemWrapperWidth: 150,
    }
  });

  let fillRatio = (state.data.currentContent / state.data.maxContent) * 175;

  const setFrequency = (freq) => {
    dispatch({type: 'GRAPH DATA', field: 'contentFrequency', payload: freq})
  };

  let contentLabels;
  switch (state.data.contentFrequency)
  {
    case 'Weekly':
      contentLabels = ["25/04", "02/05", "09/05", "16/05", "23/05", "30/05"];
      break;
    case 'Monthly':
      contentLabels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
      break;
    default:
      contentLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
      break;
  }

  let contentConfig = {
    labels: contentLabels,
    datasets: [
      {
        data: state.data.contentData,
        color: (opacity = 1) => `rgba(41,144,203, ${opacity})`, // optional
        strokeWidth: 3 // optional
      }
    ],
    legend: ["Water (L)"] // optional
  };

  return(
    <PageWrapper title={'Water management'}>
      <Card centered={true} marginTop={30}>
        <View style={waterStyles.glassContainer}>
          <Image source={require("../../../../assets/img/Water.png")} style={[waterStyles.water, { top: 175 - fillRatio }]} />
          <Image source={require("../../../../assets/img/Empty_Glass.png")} style={waterStyles.glass} />
        </View>
        
        <Text style={textStyles.textDark}>{state.data.currentContent} / {state.data.maxContent} L</Text>
      </Card>

      <PillSelection marginTop={30} marginBottom={15}>
        <Pill onPress={() => setFrequency('Daily')}>Daily</Pill>
        <Pill onPress={() => setFrequency('Weekly')}>Weekly</Pill>
        <Pill onPress={() => setFrequency('Monthly')}>Monthly</Pill>
      </PillSelection>

      <Card padding={15} onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'chartWrapperWidth', payload: nativeEvent.layout.width})}>
        <ContentChart containerPadding={15} containerWidth={state.layout.chartWrapperWidth} data={contentConfig}></ContentChart>
      </Card>

      <Grid centered={true}>
        <GridItem onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'gridItemWrapperWidth', payload: nativeEvent.layout.width})} containerWidth={state.layout.gridItemWrapperWidth}>
          <PHMeter containerPadding={shared.gridItem.padding} containerWidth={state.layout.gridItemWrapperWidth} value={state.data.pHValue}/>
        </GridItem>

        <GridItem containerWidth={state.layout.gridItemWrapperWidth}>
          <ClarityGraph containerPadding={shared.gridItem.padding} clarityData={state.data.clarityData} containerWidth={state.layout.gridItemWrapperWidth}/>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}

export default WaterPage;
