import * as userActionTypes from './userActions';
import initialUserState from './userState';

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_USER: {
      return { ...state, currentUser: action.userInfo };
    }
    case userActionTypes.LOGOUT_USER: {
      return { ...state, ...initialUserState };
    }
    default:
      return state;
  }
};

export default userReducer;
