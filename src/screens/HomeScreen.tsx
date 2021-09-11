import React, {FC, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {dp} from '../helpers/DevicePixels';
import Text from '../components/Text';
import {CartInterface, CartItemApi, HomeNavigationProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/rootReducer';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../assets/Colors';
import GradientButton from '../components/GradientButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from '../components/CartItem';
import { useQuery} from '@apollo/client';
import {updateCartItem} from '../redux/actions/CartActions';
import {GET_CART_ITEMS_QUERY} from '../api/queries';
import LoadingAnimation from '../components/LoadingAnimation';
import {setIsLoading} from '../redux/actions/AppActions';

const HomeScreen: FC<HomeNavigationProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.app);
  const {items} = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(setIsLoading(true));
  }, []);

  const {loading, error, data} = useQuery(GET_CART_ITEMS_QUERY, {
    onCompleted: data => {
      setTimeout(() => {
        dispatch(setIsLoading(false));
        data.cartItems.map((item: CartItemApi) => {
          dispatch(
            updateCartItem({
              id: parseInt(item.id),
              title: item.title,
              description: item.description,
              dimensions: {
                width: item.width,
                height: item.height,
                depth: item.depth,
              },
              unmountingWanted: item.unmounting,
            }),
          );
        });
      }, 2000);
    },
  });

  function goToAddToCart() {
    navigation.push('AddToCartScreen');
  }
  function openCartItem(item: CartInterface) {
    navigation.push('AddToCartScreen', {item});
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingAnimation color={Colors.orange} />
      ) : items.length == 0 ? (
        <View style={styles.noPackagesContainer}>
          <Text>There are no packages in your cart</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollView}>
          <Text style={styles.header}>Cart Items</Text>
          {items.map((item, idx) => {
            return (
              <CartItem key={idx} item={item} openCartItem={openCartItem} />
            );
          })}
        </ScrollView>
      )}

      <GradientButton
        style={styles.floatingButton}
        rightIcon={
          <Icon
            name="cart-plus"
            color={Colors.white}
            size={dp(25)}
            style={{paddingRight: dp(12)}}
          />
        }
        onPress={goToAddToCart}
        text={'Add new item'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center'
  },
  scrollViewContainer: {
    paddingBottom: dp(120),
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: dp(12),
  },
  header: {
    marginVertical: dp(8),
    marginLeft: dp(12),
    fontSize: dp(18),
  },
  noPackagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    marginTop: dp(20),
    position: 'absolute',
    right: dp(10),
    bottom: dp(10),
  },
});
export default HomeScreen;
