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

import {SlidingView} from '../../components/SlidingView'

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
        <SlidingView style={[StyleSheet.flatten(style), shared.shadow]} from={-200} to={10} duration={450}>
            <View style={{margin:10, bottom:-40}}>
            <Icon name="close" size={30} color={'black'} onPress={onClick}></Icon>
            {
                token ?
                <>{SideBarAuthConfig.map((elem, i) => <Link to={{screen:elem.route}} style={{fontSize:20, marginTop:20}} key={i} onPress={onClick}>{elem.name}</Link>)}</> :
                <>{SideBarConfig.map((elem, i) => <Link to={{screen:elem.route}} style={{fontSize:20, marginTop:20}} key={i} onPress={onClick}>{elem.name}</Link>)}</>
            }
            
            </View>
            
        </SlidingView>
    );
}

export default Sidebar;