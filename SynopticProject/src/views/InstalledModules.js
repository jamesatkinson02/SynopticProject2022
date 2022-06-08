import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import PageWrapper from "../components/Layout/PageWrapper";
import Card from "../components/Layout/Card";
import { useState } from "react";
import { textStyles } from "../styles/textSheet";
import { shared } from "../styles/sharedSheet";
import AddButton from "../components/Inputs/AddButton";

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
      <Card marginTop={30}>
        <Text style={[textStyles.largerText, textStyles.textDark1]}>{props.moduleName}</Text>

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
      statComponents: <></>,
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
      <AddButton onPress={() => {}}>+ add module</AddButton>
    </PageWrapper>
  );
};

export default InstalledModules;
