import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ReactElement} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

// Navigation
export interface HomeNavigationProps {
  navigation: StackNavigationProp<ParamListBase, 'HomeScreen'>;
}
export interface LoadingNavigationProps {
  navigation: StackNavigationProp<ParamListBase, 'LoadingScreen'>;
}
export interface AddToCartNavigationProps {
  route: RouteProp<{params: {item: CartInterface}}, 'params'>;
  navigation: StackNavigationProp<ParamListBase, 'LoadingScreen'>;
}

// Objects
export interface DimensionInterface {
  height: number;
  width: number;
  depth: number;
}

export interface CartInterface {
  id: number;
  title: string;
  description: string;
  dimensions: DimensionInterface;
  unmountingWanted: boolean;
}

export interface CartItemApi {
  __typename: string;
  depth: number;
  description: string;
  height: number;
  id: string;
  title: string;
  unmounting: boolean;
  width: number;
}
// Redux
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartInterface;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: CartInterface;
}

interface UpdateCartItemAction {
  type: typeof UPDATE_CART_ITEM;
  payload: CartInterface;
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemAction;

export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_KEYBOARD_OPEN = 'SET_IS_KEYBOARD_OPEN';

interface SetIsLoadingAction {
  type: typeof SET_IS_LOADING;
  payload: boolean;
}

export type AppActionTypes = SetIsLoadingAction;

// Components
export type GradientButtonSpecialProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  gradientStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  text: String;
  colors?: Array<string | number>;
  rightIcon?: ReactElement;
};

export interface GradientButtonProps
  extends GradientButtonSpecialProps,
    TouchableOpacityProps {}

export type LoadingAnimationProps = {
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export interface CartItemProps {
  item: CartInterface;
  openCartItem: Function;
}
