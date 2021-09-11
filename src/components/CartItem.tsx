import React, {FC} from 'react';
import {dp} from '../helpers/DevicePixels';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CartInterface, CartItemProps} from '../types';
import {Colors} from '../assets/Colors';
import {calculatePrice} from '../helpers/Utils';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../redux/actions/CartActions';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../components/Text';

const CartItem: FC<CartItemProps> = ({item, openCartItem}) => {
  const dispatch = useDispatch();

  function removeItemFromCart(item: CartInterface) {
    dispatch(removeFromCart(item));
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Cart item removed successfully!',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: dp(20),
    });
  }

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartDetailWrapper}>
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemInfoDetail}>{item.title}</Text>
          <Text style={styles.cartItemInfoDetail}>{item.description}</Text>
          <Text
            style={
              styles.cartItemInfoDetail
            }>{`${item.dimensions.width}cm x ${item.dimensions.height}cm x ${item.dimensions.depth}cm`}</Text>
          <Text style={styles.cartItemInfoDetail}>{`Unmounting/Mounting ${
            item.unmountingWanted ? 'included' : 'is not included'
          }`}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.priceContainer}>
          <Text>
            {calculatePrice(
              item.dimensions.width,
              item.dimensions.height,
              item.dimensions.depth,
              item.unmountingWanted,
            )}
          </Text>
          <Text style={styles.priceCurrency}> kr/month</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => removeItemFromCart(item)}
          style={styles.removeItemButton}>
          <Icon name="cart-remove" size={dp(20)} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openCartItem(item)}
          style={styles.editItemButton}>
          <Icon
            name="file-document-edit-outline"
            size={dp(20)}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartDetailWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    borderRadius: dp(5),
    backgroundColor: 'white',
    paddingHorizontal: dp(12),
    marginVertical: dp(12),
    marginHorizontal: dp(12),
  },
  cartItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: dp(10),
  },
  cartItemInfoDetail: {
    paddingVertical: dp(5),
  },
  divider: {
    width: 1,
    height: dp(80),
    backgroundColor: Colors.gray,
    marginHorizontal: dp(6),
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCurrency: {
    paddingVertical: dp(5),
  },
  removeItemButton: {
    backgroundColor: Colors.red,
    borderRadius: 50,
    padding: dp(11),
    marginVertical: dp(6),
    elevation: 4,
  },
  editItemButton: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    padding: dp(11),
    marginVertical: dp(6),
    elevation: 4,
  },
});

export default CartItem;
