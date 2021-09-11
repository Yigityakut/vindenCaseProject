import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../assets/Colors';
import Text from './Text';
import {dp} from '../helpers/DevicePixels';
import LinearGradient from 'react-native-linear-gradient';
import {GradientButtonProps} from '../types';
import {Config} from '../assets/Config';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/rootReducer';

const GradientButton: FC<GradientButtonProps> = props => {
  const {isLoading} = useSelector((state: RootState) => state.app);

  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading}
      onPress={props.onPress}
      style={[styles.button, props.style, props.buttonStyle]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={props.colors || Config.defaultGradient}
        style={[
          {justifyContent: props.rightIcon ? 'space-between' : 'center'},
          styles.gradient,
          props.gradientStyle,
        ]}>
        <Text style={[styles.buttonText, props.buttonTextStyle]}>
          {props.text}
        </Text>
        {props.rightIcon && props.rightIcon}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: dp(4),
    elevation: 4,
  },
  gradient: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: dp(4),
  },
  buttonText: {
    paddingVertical: dp(20),
    paddingHorizontal: dp(14),
    fontSize: dp(17),
    color: Colors.white,
  },
});

export default GradientButton;
