import { createAction } from 'redux-actions';

export const loginUser = createAction('LOGIN_USER', currentUser => ({ currentUser }));
export const logoutUser = createAction('LOGOUT_USER');
