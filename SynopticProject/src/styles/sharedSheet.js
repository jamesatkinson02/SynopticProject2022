import {StyleSheet} from 'react-native';

export const shared = StyleSheet.create({
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


  