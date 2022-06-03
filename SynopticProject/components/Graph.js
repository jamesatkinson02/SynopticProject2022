import React from 'react';
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions, StyleSheet, View, Text } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(64,64,64, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const data = {
  labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [200, 450, 280, 800, 990, 430, 560],
      color: (opacity = 1) => `rgba(41,144,203, ${opacity})`, // optional
      strokeWidth: 3 // optional
    }
  ],
  legend: ["Water (L)"] // optional
};

export default function Graph()
{
    return <View style={styles.container}><Text style={styles.grey}>Water Management</Text><LineChart
    data={data}
    width={screenWidth}
    height={220}
    chartConfig={chartConfig}
    style={styles.graph}
  /></View>
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  grey: {
    color: 'grey',
    fontSize:30,
    textAlign:"center"
  },
  graph:{
    marginTop:25,
  }
});