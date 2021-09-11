import React, {FC} from 'react';
import {screenWidth} from '../helpers/DevicePixels';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import {LoadingAnimationProps} from '../types';
import {Colors} from '../assets/Colors';

const LoadingAnimation: FC<LoadingAnimationProps> = props => {
  const color = props.color || Colors.black;
  return (
    <LottieView
      source={require('../assets/animations/loadingbox.json')}
      autoPlay={true}
      loop
      style={[styles.animation, props.style]}
      resizeMode="cover"
      colorFilters={[
        {
          keypath: 'crate Outlines - Group 1',
          color,
        },
        {
          keypath: 'crate Outlines - Group 2',
          color,
        },
        {
          keypath: 'crate Outlines - Group 3',
          color,
        },
        {
          keypath: 'crate Outlines - Group 4',
          color,
        },
        {
          keypath: 'Merged Shape Layer',
          color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    alignSelf: 'center',
  },
});

export default LoadingAnimation;
