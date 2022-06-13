import {StyleSheet} from 'react-native';

export const shared = StyleSheet.create({
  // Generic
  shadow: {
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
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 30,
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
    borderRadius: 16,
    padding: 20,
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

  // components/Inputs/TextInput.js
  textInput:{
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 16,
    
    backgroundColor: '#FFF',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#aaa',
    width: 280,
  },

  // components/Inputs/Button.js
  button: {
    display: 'flex',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 10,
  },

  buttonGreen: {
    backgroundColor: '#3DDE87',
  },
  buttonBlue: {
    backgroundColor: '#3DB6DE',
  },
  buttonRed: {
    backgroundColor: '#F04936',
  },
  buttonOrange: {
    backgroundColor: '#FFA339',
  },

  buttonText: {
    fontSize: 18,
  },

  // components/Inputs/PillSelection.js
  pillContainer: {
    flexGrow: 1,
  },
  pill: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  pillText: {
    fontSize: 14,
    textAlign: 'center',
  },

  pillSelection: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: -5,
    marginTop: 30,
  },

  // components/Inputs/AddButton.js
  addButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  addButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },

  // views/InstalledModules.js
  moduleTopBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
  },
  statisticsContainer: {
    marginTop: 15,
    padding: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },

  // components/Graphs/RMProgressChart.js
  progressChartLabel: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  labelText: {
    textAlign: 'center',
    width: '100%',
  },
  
  container: {
    backgroundColor:'#f2f5f3',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
    flex:1,
    position:'relative',
    marginTop: -40,
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

  sideBarSheet:{
    alignSelf:'flex-start',
    position: 'absolute',
    minWidth: 200,
    width: '50%',
    height:'100%',
    backgroundColor: 'rgba(242, 245, 243, 1)',
    paddingTop: 0,
  },
  hamburgerSelector:{
    marginTop: 40,
    left: 30,
    marginBottom: 20,
  }
})


  