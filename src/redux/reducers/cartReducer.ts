import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CartInterface,
  CartActionTypes,
  UPDATE_CART_ITEM,
} from './../../types';

interface CartState {
  items: CartInterface[];
}

const initialState: CartState = {
  items: [
    // TEST PRODUCTS
    // {
    //   id: Math.floor(Math.random() * 100000),
    //   title: 'Big box',
    //   description: 'Big box with a detailed description',
    //   dimensions: {
    //     height: 40,
    //     width: 40,
    //     depth: 40,
    //   },
    //   unmountingWanted: true,
    // },
    // {
    //   id: Math.floor(Math.random() * 100000),
    //   title: 'Small box',
    //   description: 'Small box with a detailed description',
    //   dimensions: {
    //     height: 10,
    //     width: 10,
    //     depth: 10,
    //   },
    //   unmountingWanted: false,
    // },
    
  ],
};

export function cartReducer(
  state: CartState = initialState,
  action: CartActionTypes,
): CartState {
  switch (action.type) {
    case ADD_TO_CART: {
      return Object.assign({}, state, {
        items: [...state.items, action.payload],
      });
    }
    case REMOVE_FROM_CART: {
      return Object.assign({}, state, {
        items: [...state.items.filter((x: any) => x != action.payload)],
      });
    }
    case UPDATE_CART_ITEM: {
      return Object.assign({}, state, {
        items: [
          ...state.items.filter(
            (x: CartInterface) => x.id != action.payload.id,
          ),
          action.payload,
        ],
      });
    }
    default:
      return state;
  }
}
