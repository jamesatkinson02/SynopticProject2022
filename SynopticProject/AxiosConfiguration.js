import axios from "axios";
import { Platform } from "react-native";

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


// Add the token to all request headers
// http.interceptors.request.use(config => {
//   const token = window.sessionStorage.getItem('token');
//   config.headers.authorisation = token;
//   return config;
// });

export default http;
