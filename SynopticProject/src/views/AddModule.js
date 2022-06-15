import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AuthContext } from "../hooks/useToken";

import PageWrapper from "../components/Layout/PageWrapper";
import Card from "../components/Layout/Card";
import RMTextInput from "../components/Inputs/TextInput";
import RMButton from "../components/Inputs/Button";
import RMText from "../components/Layout/RMText";
import FormError from "../components/Layout/FormError";

import { shared } from "../styles/sharedSheet";
import { textStyles } from "../styles/textSheet";
import http from "../../AxiosConfiguration";

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
  const { deviceData, saveDeviceData } = useContext(AuthContext);

  const [scanEnabled, setScanEnabled] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const [error, setError] = useState('');

  const codeScanned = ({ type, data }) => {
    setScanned(true);
    setDeviceID(data);
  };

  const submitData = () => {
    http.post('/devices/register-device', { deviceId: deviceID })
    .then(res => {
      if (res.data.err) {
        setError(res.data.err);
        return;
      }

      let newDevice = res.data.newDevice;
      let newDeviceData = [...deviceData, newDevice];
      saveDeviceData(newDeviceData);

      props.navigation.navigate('InstalledModules');
    });
  };

  return (
    <>
      <View style={shared.container}>
        <RMText style={[textStyles.header, textStyles.textDark2]}>Add device</RMText>
        <Card marginTop={30} centered={true}>
          <View>
            <RMTextInput placeholder="Device ID" onChangeText={setDeviceID} value={deviceID}/>
            <RMButton title={'Register'} onPress={submitData}/>
            <RMButton title={'Scan QR code'} marginTop={30} onPress={() => { setScanned(false); setScanEnabled(true) }}/>
            { error ? <FormError>{error}</FormError> : <></> }
          </View>
        </Card>
      </View>

      <QRScanner scanEnabled={scanEnabled} scanned={scanned} codeScanned={codeScanned}/>
    </>
  );
};

export default AddModule;
