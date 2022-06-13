import PageWrapper from "../../../components/Layout/PageWrapper";

import { useReducer } from "react";
import moduleReducer from "../../../reducers/moduleReducer";
import { PillSelection, Pill } from "../../../components/Inputs/PillSelection";
import Card from "../../../components/Layout/Card";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { View, Image } from "react-native";

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
      currentGeneration: { data: [0.6] },
      currentUsage: { data: [0.6] },
    },
    layout: {
      chartWrapperWidth: 10,
      gridItemWrapperWidth: 150,
    }
  });

  const setUsageFrequency = (freq) => {
    dispatch({ type: 'GRAPH DATA', field: 'usageFrequency', payload: freq })
  };

  const setGenerationFrequency = (freq) => {
    dispatch({ type: 'GRAPH DATA', field: 'generationFrequency', payload: freq })
  };

  let usageLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let generationLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  return(
    <PageWrapper title={'Electricity management'}>
      <Grid centered={true}>
        <GridItem onLayout={({ nativeEvent }) => dispatch({type: 'LAYOUT DATA', field: 'gridItemWrapperWidth', payload: nativeEvent.layout.width})} containerWidth={state.layout.gridItemWrapperWidth}>
          <CurrentUsage containerPadding={shared.gridItem.padding} data={state.data.currentUsage} containerWidth={state.layout.gridItemWrapperWidth}/>
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
