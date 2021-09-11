import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, AddToCartScreen, LoadingScreen} from '../screens';

const MainNavigator: React.FC = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName="LoadingScreen">
      <Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Dashboard', headerLeft: () => null}}
      />
      <Screen
        name="AddToCartScreen"
        component={AddToCartScreen}
        options={{title: 'Cart Item'}}
      />
    </Navigator>
  );
};

export default MainNavigator;
