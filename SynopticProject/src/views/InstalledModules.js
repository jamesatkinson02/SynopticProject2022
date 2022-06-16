import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import PageWrapper from "../components/Layout/PageWrapper";
import Card from "../components/Layout/Card";
import { useEffect, useState, useContext } from "react";
import { textStyles } from "../styles/textSheet";
import { shared } from "../styles/sharedSheet";
import AddButton from "../components/Inputs/AddButton";
import RMText from "../components/Layout/RMText";
import http from "../../AxiosConfiguration";
import { AuthContext } from "../hooks/useToken";

// Module components
import WaterStatComponents from "./Modules/Water/WaterStatComponents";
import ElectricityStatComponents from "./Modules/Electricity/ElectricityStatComponents";
import CQStatComponents from "./Modules/CropQuality/CQStatComponents";

const MODULES = {
  'WATER': {
    displayName: 'Water',
    route: 'Water',
    statComponents: WaterStatComponents,
  },
  'ELECTRICITY': {
    displayName: 'Electricity',
    route: 'Electricity',
    statComponents: ElectricityStatComponents,
  },
  'CROP_QUALITY': {
    displayName: 'Crop quality',
    route: 'CropQuality',
    statComponents: CQStatComponents,
  },
};

const StatisticsContainer = (props) => {
  return (
    <View style={shared.statisticsContainer}>
      {props.children}
    </View>
  );
};

const ModuleButton = (props) => {
  let module = MODULES[props.moduleType];
  let route = module.route;
  let name = module.displayName;

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(route, { deviceId: props.deviceId })}>
      <Card marginTop={30} padding={10}>
        <View style={shared.moduleTopBar}>
          <RMText style={[textStyles.largerText, textStyles.textDark1]}>{name}</RMText>
          <RMText style={[textStyles.textDark1]}>{props.deviceId} - 100%</RMText>
        </View>

        <StatisticsContainer>
          {<module.statComponents deviceId={props.deviceId} navigation={props.navigation}/> || <></>}
        </StatisticsContainer>
      </Card>
    </TouchableOpacity>
  );
};

const InstalledModules = (props) => {
  const { deviceData, saveDeviceData } = useContext(AuthContext);

  return (
    <PageWrapper title={'Installed devices'}>
      { props.elements }
      {
        (deviceData || []).map(device =>
          <ModuleButton
            moduleType={device.type}
            deviceId={device.device_id}
            key={device.device_id}
            navigation={props.navigation}
          />
        )
      }

      <AddButton onPress={() => props.navigation.navigate('AddModule')}>+ add module</AddButton>
    </PageWrapper>
  );
};

export default InstalledModules;
