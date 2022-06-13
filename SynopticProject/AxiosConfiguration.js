import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from "expo-constants";
const { manifest } = Constants;

let port = 5000;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:${port}`;

const http = axios.create({
  baseURL: uri,
  headers: {
    "Content-type": "application/json",
  }
});

http.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  config.headers.authtoken = token;

  return config;
});

export default http;
