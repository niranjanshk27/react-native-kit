import React from 'react';
import { Animated, Easing } from 'react-native';

import { useAnimatedStyle } from "./useAnimatedStyle.js";

const rotateImageStyles = (driver: Animated.Value) => ({
  transform: [{
    rotate: driver.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
  }],
})

export function useAnimRotationOnLoop(from = 0, to = 1) {
  const [rotateStyles, driver] = useAnimatedStyle(from, rotateImageStyles);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(driver, {
        toValue: to,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return rotateStyles;
};
