import {Text as RNText, StyleSheet, TextProps} from 'react-native';
import React, {FC} from 'react';

import {Colors} from '../assets/Colors';
import {dp} from '../helpers/DevicePixels';

const Text: FC<TextProps> = props => {
  return (
    <RNText {...props} style={[styles.text, props.style]}>
      {props.children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: dp(14),
    color: Colors.black,
  },
});

export default Text;
