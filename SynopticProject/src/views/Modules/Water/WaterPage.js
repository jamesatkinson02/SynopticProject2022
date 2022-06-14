import { Dimensions, View, Text, Image } from "react-native";
import PageWrapper from "../../../components/Layout/PageWrapper";
import Card from "../../../components/Layout/Card";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { Pill, PillSelection } from "../../../components/Inputs/PillSelection";
import { useReducer, useEffect } from "react";
import http from "../../../../AxiosConfiguration";

// Graphs
import ContentChart from "./Graphs/ContentChart";
import PHMeter from "../../../components/Graphs/PHMeter";
import ClarityGraph from "./Graphs/ClarityGraph";

// Style sheets
import { shared } from "../../../styles/sharedSheet";
import { waterStyles } from "../../../styles/Modules/waterSheet";
import { textStyles } from "../../../styles/textSheet";
import { useState } from "react";

import moduleReducer from "../../../reducers/moduleReducer";
import RMText from "../../../components/Layout/RMText";

const WaterPage = ({ route }) => {
  let deviceId = route.params.deviceId;
  console.log(deviceId)

  const [state, dispatch] = useReducer(moduleReducer, {
    data: {
      pHValue: 7,
      clarityData: { data: [0.6] },
      currentContent: 650,
      maxContent: 1000,
      contentData: [200, 450, 280, 800, 990, 430, 560],
      contentFrequency: 'Daily',
      contentLabels: []
    },
    layout: {
      chartWrapperWidth: 10,
      gridItemWrapperWidth: 150,
    }
  });

  const graphDataHandler = (field, val) => {
    dispatch({ type: 'GRAPH DATA', field: field, payload: val })
  };

  const setFrequency = (freq) => {
    graphDataHandler('contentFrequency', freq);
  };

  useEffect(() => {
    http.post('/water/current-data', {
      deviceId: deviceId
    }).then(res => {
      graphDataHandler('currentContent', res.data.content.data);
      graphDataHandler('clarityData', { data: [res.data.clarity.data] });
      graphDataHandler('pHValue', res.data.ph.data);
    });
  }, []);

  useEffect(() => {
    http.post('/devices/chart-data', {
      deviceId: deviceId,
      field: 'content',
      frequency: state.data.contentFrequency
    }).then(res => {
      graphDataHandler('contentData', res.data.data);
      graphDataHandler('contentLabels', res.data.labels);
    });
  }, [state.data.contentFrequency]);

  let fillRatio = (state.data.currentContent / state.data.maxContent) * 175;
  let contentLabels = state.data.contentLabels;

  return(
    <PageWrapper title={'Water management'}>
      <Card centered={true} marginTop={30}>
        <View style={waterStyles.glassContainer}>
          <Image source={require("../../../../assets/img/Water.png")} style={[waterStyles.water, { top: 175 - fillRatio }]} />
          <Image source={require("../../../../assets/img/Empty_Glass.png")} style={waterStyles.glass} />
        </View>
        
        <RMText style={textStyles.textDark}>{state.data.currentContent} / {state.data.maxContent} L</RMText>
      </Card>

      <PillSelection marginTop={30} marginBottom={15}>
        <Pill onPress={() => setFrequency('Daily')}>Daily</Pill>
        <Pill onPress={() => setFrequency('Weekly')}>Weekly</Pill>
        <Pill onPress={() => setFrequency('Monthly')}>Monthly</Pill>
      </PillSelection>

      <Card padding={15} onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'chartWrapperWidth', payload: nativeEvent.layout.width})}>
        <ContentChart containerPadding={15} containerWidth={state.layout.chartWrapperWidth} data={state.data.contentData} labels={contentLabels}/>
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
