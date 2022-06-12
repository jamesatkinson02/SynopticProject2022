import { StyleSheet } from 'react-native';

export const cqStyles = StyleSheet.create({
  overallRating: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ratingImg: {
    resizeMode: 'contain',
    height: 250,
    aspectRatio: 1,
  },

  ratingText: {
    marginTop: 25,
  },
});
