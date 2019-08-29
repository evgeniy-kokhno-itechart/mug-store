import Axios from 'axios';
import { rootUrl } from '../general/constants';

export function registerUser(userInfo) {
  //  !!! FAKE REGISTRATION LOGIC should be replaced in prod app
  const response = Axios.post(`${rootUrl}/users/register`, userInfo);
  return response;
}

export function saveUserInfo() {
  const response = Axios.post(`${rootUrl}/users/edituser`);
  return response;
}
