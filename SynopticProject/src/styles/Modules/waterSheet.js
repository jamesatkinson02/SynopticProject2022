import { StyleSheet } from 'react-native';

export const waterStyles = StyleSheet.create({
    grey: {
      color: 'grey',
      fontSize: 30,
    },

    glassContainer:{
      width: 200,
      height: 195,
      overflow: 'hidden',
      position: 'relative',
    },

    water:{
      position: 'absolute',
      width: 200,
      height: 200,
      
      left: 0,
      top: 175,
    },

    glass:{
      position: 'relative',
      width: 200,
      height: 200,
      resizeMode: 'contain'
    },
  });