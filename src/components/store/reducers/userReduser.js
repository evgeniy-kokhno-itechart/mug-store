import * as actionTypes from "../actions";

const initialState = {
  currentUser: { roles: [] }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER: {
      return { ...state, currentUser: action.userInfo };
    }
    case actionTypes.LOGOUT_USER: {
      console.log("Logging out...");
      return { ...state, ...initialState };
    }
    default:
      return state;
  }
};

export default userReducer;
