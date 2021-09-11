import React, {FC, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { LoadingNavigationProps } from '../types';

const LoadingScreen: FC<LoadingNavigationProps> = ({navigation}) => {
  useEffect(() => {
    // Fetch some apis to collect necessary data for the app (configs etc.)
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
