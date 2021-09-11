import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CartInterface,
} from '../../types';

export function addToCart(item: CartInterface) {
  return {type: ADD_TO_CART, payload: item};
}
export function removeFromCart(item: CartInterface) {
  return {type: REMOVE_FROM_CART, payload: item};
}
export function updateCartItem(item: CartInterface) {
  return {type: UPDATE_CART_ITEM, payload: item};
}
