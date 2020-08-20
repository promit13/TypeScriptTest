import {ActionTypes} from '../actions/types';

const initialState = {
  user: null,
  userDetail: null,
  isLoading: false,
  authError: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_USER:
      return {...state, isLoading: true, authError: ''};
    case ActionTypes.SIGNUP_USER_FULFILLED:
      return {...state, user: action.payload, isLoading: false};
    case ActionTypes.AUTH_FAILED:
      return {...state, authError: action.error};
    default:
      return state;
  }
};

// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionTypes.LOGIN_USER:
//       return {...state, isLoading: true, authError: ''};
//     case ActionTypes.LOGIN_USER_FULFILLED:
//       return {...state, user: action.payload};
//     case ActionTypes.SIGNUP_USER:
//       return {...state, isLoading: true, authError: ''};
//     case ActionTypes.SIGNUP_USER_FULFILLED:
//       return {...state, user: action.payload, isLoading: false};
//     case ActionTypes.FETCH_USER_DATA:
//       return {...state, isLoading: true, authError: ''};
//     case ActionTypes.FETCH_USER_DATA_FULFILLED:
//       return {...state, userDetail: action.payload};
//     case ActionTypes.AUTH_FAILED:
//       return {...state, authError: action.error};
//     case ActionTypes.LOGOUT_USER_FULFILLED:
//       return initialState;
//     default:
//       return state;
//   }
// };
