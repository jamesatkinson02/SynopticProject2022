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

import {SlidingView} from './SlidingView'
import {FadeView} from './FadeView'


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
    name:'Modules',
    route:'InstalledModules',
    iconName: '',
},
{
    name: 'Sign out',
    route:'SignOut',
    iconName:'',
}
]

const  Sidebar = ({style, onClick}) => {
    var { accessToken, saveAccessToken } = useContext(AuthContext);

    return(
        <SlidingView style={style} from={-200} to={0} duration={450}>
            <FadeView style={{margin:10, bottom:-40}} from={0} to={1} duration={700}>
            <Icon name="close" size={30} color={'black'} style={{marginLeft: 10}} onPress={onClick}></Icon>
            {
                accessToken ?
                <>{SideBarAuthConfig.map((elem, i) => <Link to={{screen:elem.route}} style={{fontSize:20, marginTop:20, marginLeft: 10}} key={i} onPress={onClick}>{elem.name}</Link>)}</> :
                <>{SideBarConfig.map((elem, i) => <Link to={{screen:elem.route}} style={{fontSize:20, marginTop:20, marginLeft: 10}} key={i} onPress={onClick}>{elem.name}</Link>)}</>
            }
            
            </FadeView>
        </SlidingView>
    );
}

export default Sidebar;