import { StyleSheet } from 'react-native';

export const waterStyles = StyleSheet.create({
    grey: {
      color: 'grey',
      fontSize: 30,
    },

    glassContainer:{
      overflow: 'hidden',
      position: 'relative',
    },

    water:{
      position: 'absolute',
      width: 200,
      height: 200,
      
      left: 0,
      top: 10,
    },

    glass:{
      position: 'relative',
      width: 201,
      height: 205,
      resizeMode: 'contain'
    },

    
  });