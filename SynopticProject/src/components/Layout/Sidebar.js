import Icon from 'react-native-vector-icons/FontAwesome';
import {shared} from '../../styles/sharedSheet'
import {Modal, View, Text, Touchable, StyleSheet} from 'react-native';
import HamburgerSelector from './HamburgerSelector';
import { Link } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {useState} from 'react';
import RMButton from '../Inputs/Button';

import { AuthContext } from '../../hooks/useToken';
import { useContext } from 'react';

const SideBarConfig = [
{
    name: 'Login',
    route:'Login',
    iconName:'',
},
{
    name: 'Sign up',
    route:'Signup',
    iconName:'',
}
];

const SideBarAuthConfig = [
{
    name: 'Profile',
    route:'Profile',
    iconName: '',
},
{
    name:'Installed Modules',
    route:'InstalledModules',
    iconName: '',
},
{
    name: 'Settings',
    route:'Settings',
    iconName:'',
},
{
    name: 'Sign out',
    route:'SignOut',
    iconName:'',
}
]

const  Sidebar = ({style, onClick}) => {
    var { token, saveToken } = useContext(AuthContext);

    return(
        <View style={[StyleSheet.flatten(style), shared.shadow]}>
            <View style={{margin:10, bottom:-40}}>
            <Icon name="close" size={30} color={'black'} onPress={onClick}></Icon>
            {
                token ?
                <>{SideBarAuthConfig.map((elem, i) => <Link to={{screen:elem.route}} style={{fontSize:20, marginTop:20}} key={i}>{elem.name}</Link>)}</> :
                <>{SideBarConfig.map((elem, i) => <Link to={{screen:elem.route}} style={{fontSize:20, marginTop:20}} key={i}>{elem.name}</Link>)}</>
            }
            
            </View>
        </View>
    );
}

export default Sidebar;