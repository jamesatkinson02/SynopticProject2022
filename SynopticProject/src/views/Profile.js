import PageWrapper from '../components/Layout/PageWrapper';

import {TouchableOpacity, Text, View, Image} from 'react-native';
import  {profileSheets}  from '../styles/profileSheet';
import { textStyles } from '../styles/textSheet';
import { shared } from '../styles/sharedSheet';


export default function Profile()
{
    return(
    <PageWrapper title={'Profile Page'}>
        <View style={shared.container}>
        <TouchableOpacity><Image style={profileSheets.profilePic} source={require('../../assets/img/adaptive-icon.png')} /></TouchableOpacity>
        <Text style={ textStyles.textDark}>Name</Text>
        </View>
    </PageWrapper>);
}   