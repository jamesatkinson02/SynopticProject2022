import {StyleSheet} from 'react-native';

export const shared = StyleSheet.create({
  // Generic
  

  // components/Layout/PageWrapper.js
  pageScrollView: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: '100%',
  },

  pageWrapper: {
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  pageTitle: {
    color: '#333',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 10,
  },

  // components/Layout/Card.js
  card: {
    marginTop: 30,
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 19,
    padding: 30,
    shadowColor: '#E5E5E5',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  // components/Layout/Grid.js
  grid: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  gridItem: {
    minWidth: 160,
    width: '46%',

    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: 19,
    padding: 15,
    shadowColor: '#E5E5E5',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  
  container: {
    backgroundColor:'#f2f5f3',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
    flex:1,
    position:'relative',
  },
  borderWrapper:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border: '1px solid white',
    width:'auto',
    height:'auto',
    minHeight:150,
    padding: 20,
    margin:20,
    borderRadius:20,
    backgroundColor:'white'
  },
  gridContainer:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    maxWidth: '90%',
  },
  input:{
    padding:10,
    margin:8
  },
  smallItalics:{
    fontStyle:'italic',
    fontSize:11,
  }
      
})


  