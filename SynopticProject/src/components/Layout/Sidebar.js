import Icon from 'react-native-vector-icons/FontAwesome';
import {shared} from '../../styles/sharedSheet'
import {Modal, View, Text, Touchable} from 'react-native';
import HamburgerSelector from './HamburgerSelector';
import { Link } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {useState} from 'react';
import RMButton from '../Inputs/Button';
const SideBarConfig = [
{
    name: 'Profile',
    iconName: '',
},
{
    name:'Installed Modules',
    iconName: '',
},
{
    name: 'Settings',
    iconName:'',
},
{
    name: 'Sign out',
    iconName:'',
}
]

const  Sidebar = ({style, onClick}) => {
    return(
        <View style={style}>
            <View style={{margin:10, bottom:-40}}>
            <Icon name="close" size={30} color={'black'} onPress={onClick}></Icon>
            {SideBarConfig.map((elem, i) => <Link to={{screen:elem.name}} style={{fontSize:20, marginTop:20}} key={i}>{elem.name}</Link>)}
            </View>
        </View>
    );
}

export default Sidebar;