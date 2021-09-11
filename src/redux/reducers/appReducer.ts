import {
  SET_IS_LOADING,
  AppActionTypes,
} from './../../types';

interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

export function appReducer(
  state: AppState = initialState,
  action: AppActionTypes,
): AppState {
  switch (action.type) {
    case SET_IS_LOADING: {
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
    }

    default:
      return state;
  }
}
