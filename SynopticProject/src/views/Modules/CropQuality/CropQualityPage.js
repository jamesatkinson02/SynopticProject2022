import PageWrapper from "../../../components/Layout/PageWrapper";

import { useEffect, useReducer } from "react";
import moduleReducer from "../../../reducers/moduleReducer";
import { PillSelection, Pill } from "../../../components/Inputs/PillSelection";
import Card from "../../../components/Layout/Card";
import { Grid, GridItem } from "../../../components/Layout/Grid";

import http from '../../../../AxiosConfiguration';

// Graphs
import CurrentMoisture from "./Graphs/CurrentMoisture";
import MoistureChart from "./Graphs/MoistureChart";
import OverallQuality from "./Graphs/OverallQuality";
import PHMeter from "../../../components/Graphs/PHMeter";

// Styles
import { shared } from "../../../styles/sharedSheet";

const CropQualityPage = () => {
  const [state, dispatch] = useReducer(moduleReducer, {
    data: {
      moistureData: [200, 450, 280, 800, 990, 430, 560],
      moistureLabels: [],
      moistureFrequency: 'Daily',
      currentMoisture: { data: [0] },
      pHValue: 3,
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
    graphDataHandler('moistureFrequency', freq);
  };

  useEffect(() => {
    http.post('/crop-quality/current-data', {
      deviceId: '17c1a13a0552aed9'
    }).then(res => {
      graphDataHandler('currentMoisture', { data: [res.data.moisture.data] });
      graphDataHandler('pHValue', res.data.ph.data);
    });
  }, []);

  useEffect(() => {
    http.post('/devices/chart-data', {
      deviceId: '17c1a13a0552aed9',
      field: 'moisture',
      frequency: state.data.moistureFrequency
    }).then(res => {
      let data = res.data.data.map(val => Math.round(val * 100));

      graphDataHandler('moistureData', data);
      graphDataHandler('moistureLabels', res.data.labels);
    });
  }, [state.data.moistureFrequency]);

  let moistureLabels = state.data.moistureLabels;
  let rating = (Math.max(1 - (Math.abs(state.data.pHValue - 6.5) / 6.5), 0) + Math.max(1 - (Math.abs(state.data.currentMoisture.data - 0.4) / 0.4), 0)) / 2;

  return(
    <PageWrapper title={'Crop quality management'}>
      <Card marginTop={30} centered={true}>
        <OverallQuality rating={rating}/>
      </Card>

      <PillSelection marginTop={30} marginBottom={15}>
        <Pill onPress={() => setFrequency('Daily')}>Daily</Pill>
        <Pill onPress={() => setFrequency('Weekly')}>Weekly</Pill>
        <Pill onPress={() => setFrequency('Monthly')}>Monthly</Pill>
      </PillSelection>

      <Card padding={15} onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'chartWrapperWidth', payload: nativeEvent.layout.width})}>
        <MoistureChart containerPadding={15} containerWidth={state.layout.chartWrapperWidth} data={state.data.moistureData} labels={moistureLabels} />
      </Card>

      <Grid centered={true}>
        <GridItem onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'gridItemWrapperWidth', payload: nativeEvent.layout.width})} containerWidth={state.layout.gridItemWrapperWidth}>
          <CurrentMoisture containerPadding={shared.gridItem.padding} data={state.data.currentMoisture} containerWidth={state.layout.gridItemWrapperWidth}/>
        </GridItem>

        <GridItem onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'gridItemWrapperWidth', payload: nativeEvent.layout.width})} containerWidth={state.layout.gridItemWrapperWidth}>
          <PHMeter containerPadding={shared.gridItem.padding} containerWidth={state.layout.gridItemWrapperWidth} value={state.data.pHValue}/>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}

export default CropQualityPage;
