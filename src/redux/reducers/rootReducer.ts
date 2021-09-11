import {combineReducers} from 'redux';
import {cartReducer} from './cartReducer';
import {appReducer} from './appReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
