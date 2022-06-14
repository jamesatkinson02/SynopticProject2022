import PageWrapper from '../components/Layout/PageWrapper';

import {TouchableOpacity, Text, View, Image} from 'react-native';
import  {profileSheets}  from '../styles/profileSheet';
import { textStyles } from '../styles/textSheet';
import { shared } from '../styles/sharedSheet';
import { useContext } from 'react';
import { AuthContext } from '../hooks/useToken';


export default function Profile()
{
    const {username, setUsername} = useContext(AuthContext);
    return(
    <PageWrapper title={'Profile Page'}>
        <View style={shared.container}>
        <Text style={textStyles.header}>Profile</Text>
        <TouchableOpacity><Image style={profileSheets.profilePic} source={require('../../assets/img/adaptive-icon.png')} /></TouchableOpacity>
        
        <Text style={textStyles.textDark}>{username}</Text>
        </View>
    </PageWrapper>);
}   