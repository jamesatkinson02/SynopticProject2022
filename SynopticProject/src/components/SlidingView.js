import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import {shared} from '../styles/sharedSheet'
const SlidingView = (props) => {
    const slideAnim = useRef(new Animated.Value(props.from)).current;

    useEffect(() => {

        Animated.timing(slideAnim, {
            toValue:props.to,
            duration:props.duration,
            useNativeDriver: false
        }).start();
    }, [slideAnim]);

    return <Animated.View style={[
        shared.sideBarSheet,
        {transform: [
            {
              translateX: slideAnim,
            }
          ],

        
    }]}>
        {props.children}
    </Animated.View>
}

export {SlidingView};