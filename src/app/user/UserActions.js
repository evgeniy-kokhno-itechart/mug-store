import { createHttpAction } from '../shared';

// eslint-disable-next-line import/prefer-default-export
export const userActions = {
  Login: createHttpAction('LOGIN'),
  Logout: createHttpAction('LOGOUT'),
  SaveEdited: createHttpAction('SAVE_EDITED'),
  Register: createHttpAction('REGISTER'),
};
