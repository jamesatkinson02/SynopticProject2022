import { StyleSheet } from 'react-native';

export const electricityStyles = StyleSheet.create({
  electricityGraphContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  stencilContainer: {
    width: 141,
    height: 280,
    overflow: 'hidden',
    position: 'relative',
  },
  stencil: {
    position: 'relative',
    width: 141,
    height: 280,
    resizeMode: 'contain'
  },
  electricityFill: {
    position: 'absolute',
    width: 141,
    height: 280,
    
    left: 0,
    top: 10,
  },
  electricityBg: {
    position: 'absolute',
    width: 141,
    height: 280,
    resizeMode: 'contain'
  },
  graphLabel: {
    textAlign: 'center',
    marginTop: 5,
  },

});
