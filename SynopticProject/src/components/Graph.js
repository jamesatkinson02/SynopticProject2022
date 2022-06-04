import React from 'react';
import {
  LineChart, ProgressChart,
} from "react-native-chart-kit";
import { Dimensions, StyleSheet, View, Text, Image, ImageBackground, Button} from "react-native";
import RNSpeedometer from 'react-native-speedometer'
import {shared} from '../styles/sharedSheet';
import {waterStyles} from '../styles/Modules/waterSheet';

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

const progressBarConfig ={
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  color: (opacity = 1) => `rgba(52, 149, 235, ${opacity})`,
}

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

const phLabels = [
  {
    key: 3,
    name: 'Extremely Acidic',
    labelColor: '#ebc034',
    activeBarColor:'#ebc034',
  },
  {
    key: 4,
    name: 'Very Acidic',
    labelColor:'#ebeb34',
    activeBarColor:'#ebeb34',
  },
  {
    key: 5,
    name: 'Mildy Acidic',
    labelColor:'#b4eb34',
    activeBarColor:'#b4eb34',
  },
  {
    key: 6,
    name: 'Very Little Acid',
    labelColor:'#6beb34',
    activeBarColor:'#6beb34',
  },
  {
    key: 7,
    name: 'Neutral',
    labelColor:'#3aeb34',
    activeBarColor:'#3aeb34',
  },
  {
    key: 8,
    name: 'Very Little Alakali',
    labelColor:'#34eba5',
    activeBarColor:'#34eba5',
  },
  {
    key: 9,
    name: 'Mildly Alkaline',
    labelColor:'#34d9eb',
    activeBarColor:'#34d9eb',
  },
  {
    key: 10,
    name: 'Very Alkaline',
    labelColor:'#34aeeb',
    activeBarColor:'#34aeeb',
  },
  {
    key: 11,
    name: 'Extremely Alkaline',
    labelColor:'#348feb',
    activeBarColor:'#348feb',
  },
]

const waterQuality = {
   // optional
   labels: ["Clarity: "],
  data: [0.6],
};

export default function Graph()
{
  return <View style={shared.container}>
    
    <Text style={waterStyles.grey}>Water Management</Text>
         
    {/* Water capacity glass */}
    <View style={shared.borderWrapper}>
      <View style={waterStyles.glassContainer}>
        <Image source={require("../../assets/img/Water.png")} style={waterStyles.water} />
        <Image source={require("../../assets/img/Empty_Glass.png")} style={waterStyles.glass} />
      </View>
      <Text style={{color:'grey'}}>1000/1000 L</Text>
    </View>

    <View style={shared.borderWrapper}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={waterStyles.graph}
      />
    </View>

    <View style={shared.gridContainer}>
      <View style={shared.borderWrapper}>
        <RNSpeedometer labels={phLabels} minValue={3} maxValue={11} value={7} size={200}></RNSpeedometer>

      </View>

      <View style={shared.borderWrapper}>
        <ProgressChart width={340} height={150} strokeWidth={16} chartConfig={progressBarConfig} radius={52} data={waterQuality} hideLegend={false}></ProgressChart>
      </View>
    </View>
    
    <Button title="+ Enter data manually"></Button>

  </View>
}

