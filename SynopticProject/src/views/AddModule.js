import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';

import PageWrapper from "../components/Layout/PageWrapper";
import Card from "../components/Layout/Card";
import RMTextInput from "../components/Inputs/TextInput";
import RMButton from "../components/Inputs/Button";

const QRScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);

  if (props.scanEnabled) {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }

  if (hasPermission === null || hasPermission === false) {
    return <></>
  }

  return (
    <>{
      !props.scanned && props.scanEnabled &&
      <BarCodeScanner
        onBarCodeScanned={props.scanned ? undefined : props.codeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    }</>
  );
};

const AddModule = (props) => {
  const [scanEnabled, setScanEnabled] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [deviceID, setDeviceID] = useState("");

  const codeScanned = ({ type, data }) => {
    setScanned(true);
    setDeviceID(data);
  };

  return (
    <>
      <PageWrapper title={'Add module'}>
        <Card marginTop={30} centered={true}>
          <View>
            <RMTextInput placeholder="Device ID" onChangeText={setDeviceID} value={deviceID}/>
            <RMButton title={'Add device'}/>
            <RMButton title={'Scan QR code'} marginTop={30} onPress={() => { setScanned(false); setScanEnabled(true) }}/>
          </View>
        </Card>
      </PageWrapper>

      <QRScanner scanEnabled={scanEnabled} scanned={scanned} codeScanned={codeScanned}/>
    </>
  );
};

export default AddModule;