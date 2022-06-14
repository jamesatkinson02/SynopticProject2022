import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import {shared} from '../../styles/sharedSheet'

const FadeView = (props) => {
    const fadeAnim = useRef(new Animated.Value(props.from)).current;

    useEffect(() => {

        Animated.timing(fadeAnim, {
            toValue:props.to,
            duration:props.duration,
            useNativeDriver: false
        }).start();
    }, [fadeAnim]);

    return <Animated.View style={[
        shared.sideBarSheet,
        {
            opacity:fadeAnim
    }]}>
        {props.children}
    </Animated.View>

}

export {FadeView}