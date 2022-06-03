import React from 'react';
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions, StyleSheet, View, Text, Image, ImageBackground} from "react-native";
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
    return <View style={styles.container}><View style={styles.img}><Image source={require("../assets/Water.png")} style={styles.water} /><Image source={require("../assets/Empty_Glass.png")} style={styles.glass} /></View><Text style={styles.grey}>Water Management</Text><LineChart
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
  },
  img:{
    width:200,
    height:200,
    position:"relative",
    overflow:"hidden",
  },
  water:{
    position:"absolute",
    width:200,
    height:200,
    
    left: 5,
    top: 50,
  },
  glass:{
    position:"relative",
     width:201,
     height:201,
     
    }
});