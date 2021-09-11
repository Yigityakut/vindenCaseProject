import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  TextInputProps,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../assets/Colors';
import {dp} from '../helpers/DevicePixels';

const TextInput: FC<TextInputProps> = props => {
  return (
    <View>
      <RNTextInput
        underlineColorAndroid="transparent"
        placeholderTextColor={Colors.blackWithOpacity}
        {...props}
        style={[styles.textInput, props.style]}>
        {props.children}
      </RNTextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: dp(14),
    color: Colors.black,
    borderRadius: dp(4),
    paddingLeft: dp(15),
    elevation: 4,
    backgroundColor: Colors.white,
    marginVertical: dp(6),
  },
});

export default TextInput;
