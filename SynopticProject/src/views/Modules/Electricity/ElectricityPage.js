import PageWrapper from "../../../components/Layout/PageWrapper";

import { useReducer, useEffect } from "react";
import moduleReducer from "../../../reducers/moduleReducer";
import { PillSelection, Pill } from "../../../components/Inputs/PillSelection";
import Card from "../../../components/Layout/Card";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { View, Image } from "react-native";
import http from "../../../../AxiosConfiguration";

// Graphs
import CurrentGeneration from "./Graphs/CurrentGeneration";
import CurrentUsage from "./Graphs/CurrentUsage";
import GenerationChart from "./Graphs/GenerationChart";
import UsageChart from "./Graphs/UsageChart";

// Styles
import { shared } from "../../../styles/sharedSheet";
import { electricityStyles } from "../../../styles/Modules/electricityStyles";

const ElectricityPage = () => {
  const [state, dispatch] = useReducer(moduleReducer, {
    data: {
      usageData: [200, 450, 280, 800, 990, 430, 560],
      generationData: [200, 450, 280, 800, 990, 430, 560],
      usageFrequency: 'Daily',
      generationFrequency: 'Daily',
      usageLabels: [],
      generationLabels: [],
      currentUsage: 0,
      currentGeneration: 1,
    },
    layout: {
      chartWrapperWidth: 10,
      gridItemWrapperWidth: 150,
    }
  });

  const graphDataHandler = (field, val) => {
    dispatch({ type: 'GRAPH DATA', field: field, payload: val })
  };

  const setUsageFrequency = (freq) => {
    graphDataHandler('usageFrequency', freq);
  };

  const setGenerationFrequency = (freq) => {
    graphDataHandler('generationFrequency', freq);
  };

  useEffect(() => {
    http.post('/electricity/current-data', {
      deviceId: 'ea30d16ee48ffda8'
    }).then(res => {
      graphDataHandler('currentUsage', res.data.usage.data);
      graphDataHandler('currentGeneration', res.data.generation.data);
    });
  }, []);

  useEffect(() => {
    http.post('/devices/chart-data', {
      deviceId: 'ea30d16ee48ffda8',
      field: 'usage',
      frequency: state.data.usageFrequency
    }).then(res => {
      graphDataHandler('usageData', res.data.data);
      graphDataHandler('usageLabels', res.data.labels);
    });
  }, [state.data.usageFrequency]);

  useEffect(() => {
    http.post('/devices/chart-data', {
      deviceId: 'ea30d16ee48ffda8',
      field: 'generation',
      frequency: state.data.generationFrequency
    }).then(res => {
      graphDataHandler('generationData', res.data.data);
      graphDataHandler('generationLabels', res.data.labels);
    });
  }, [state.data.generationFrequency]);

  let usageLabels = state.data.usageLabels;
  let generationLabels = state.data.generationLabels;

  return(
    <PageWrapper title={'Electricity management'}>
      <Grid centered={true}>
        <GridItem onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'gridItemWrapperWidth', payload: nativeEvent.layout.width})} containerWidth={state.layout.gridItemWrapperWidth}>
          <CurrentUsage containerPadding={shared.gridItem.padding} data={state.data.currentUsage} max={state.data.currentGeneration} containerWidth={state.layout.gridItemWrapperWidth}/>
        </GridItem>

        <GridItem containerWidth={state.layout.gridItemWrapperWidth}>
          <CurrentGeneration containerPadding={shared.gridItem.padding} data={state.data.currentGeneration} containerWidth={state.layout.gridItemWrapperWidth}/>
        </GridItem>
      </Grid>
      
      <PillSelection marginTop={30} marginBottom={15}>
        <Pill onPress={() => setUsageFrequency('Daily')}>Daily</Pill>
        <Pill onPress={() => setUsageFrequency('Weekly')}>Weekly</Pill>
        <Pill onPress={() => setUsageFrequency('Monthly')}>Monthly</Pill>
      </PillSelection>

      <Card padding={15} onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'chartWrapperWidth', payload: nativeEvent.layout.width})}>
        <UsageChart containerPadding={15} containerWidth={state.layout.chartWrapperWidth} data={state.data.usageData} labels={usageLabels} />
      </Card>

      <PillSelection marginTop={30} marginBottom={15}>
        <Pill onPress={() => setGenerationFrequency('Daily')}>Daily</Pill>
        <Pill onPress={() => setGenerationFrequency('Weekly')}>Weekly</Pill>
        <Pill onPress={() => setGenerationFrequency('Monthly')}>Monthly</Pill>
      </PillSelection>

      <Card padding={15} onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'chartWrapperWidth', payload: nativeEvent.layout.width})}>
        <GenerationChart containerPadding={15} containerWidth={state.layout.chartWrapperWidth} data={state.data.generationData} labels={generationLabels} />
      </Card>
    </PageWrapper>
  );
}

export default ElectricityPage;
