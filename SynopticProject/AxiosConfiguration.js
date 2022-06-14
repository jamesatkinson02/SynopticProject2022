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
  const tokenStr = await AsyncStorage.getItem('accessToken');
  const refreshTokenStr = await AsyncStorage.getItem('refreshToken');
  const token = JSON.parse(tokenStr);
  const refreshToken = JSON.parse(refreshTokenStr);
  config.headers.authtoken = token;
  config.headers.refreshtoken = refreshToken;

  return config;
});

export default http;
