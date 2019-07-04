import { handleActions } from 'redux-actions';
import { loginUser, logoutUser } from './userActions';
import initialUserState from './userState';

const userReducer = handleActions(
  {
    [loginUser]: (state, { payload: { currentUser } }) => ({ ...state, currentUser }),
    [logoutUser]: state => ({ ...state, ...initialUserState }),
  },
  initialUserState,
);

export default userReducer;
