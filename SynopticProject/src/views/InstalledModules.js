import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import PageWrapper from "../components/Layout/PageWrapper";
import Card from "../components/Layout/Card";
import { useState } from "react";
import { textStyles } from "../styles/textSheet";
import { shared } from "../styles/sharedSheet";
import AddButton from "../components/Inputs/AddButton";
import WaterStatComponents from "./Modules/Water/WaterStatComponents";

const StatisticsContainer = (props) => {
  return (
    <View style={shared.statisticsContainer}>
      {props.children}
    </View>
  );
};

const ModuleButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.route)}>
      <Card marginTop={30} padding={10}>
        <View style={shared.moduleTopBar}>
          <Text style={[textStyles.largerText, textStyles.textDark1]}>{props.moduleName}</Text>
          <Text style={[textStyles.largerText, textStyles.textDark1]}>100%</Text>
        </View>

        <StatisticsContainer>
          {props.statComponents || <></>}
        </StatisticsContainer>
      </Card>
    </TouchableOpacity>
  );
};

const InstalledModules = (props) => {
  const [modules, setModules] = useState([
    {
      name: 'Water',
      route: 'Water',
      statComponents: <WaterStatComponents/>,
    },
    {
      name: 'Electricity',
      route: 'Electricity',
      statComponents: <></>,
    },
    {
      name: 'Crop quality',
      route: 'CropQuality',
      statComponents: <></>,
    },
  ]);

  return (
    <PageWrapper title={'Installed modules'}>
      { modules.map(m => <ModuleButton key={m.name} moduleName={m.name} route={m.route} navigation={props.navigation} statComponents={m.statComponents}/>) }
      <AddButton onPress={() => props.navigation.navigate('AddModule')}>+ add module</AddButton>
    </PageWrapper>
  );
};

export default InstalledModules;
