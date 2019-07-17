import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import { rootUrl } from '../general/constants';

const jwtTokenKey = 'token';

export function login(username, password) {
  // !!! FAKE AUTHENTICATION LOGIC !!! should be replaced in prod app
  let response;
  let isKnownUser = false;
  if (username === 'superadmin' && password === '12345') {
    isKnownUser = true;
    response = Axios.get(`${rootUrl}/users/1`);
  }
  if (username === 'user' && password === '12345') {
    isKnownUser = true;
    response = Axios.get(`${rootUrl}/users/2`);
  }
  if (!isKnownUser) {
    throw new Error('Incorrect username or password');
  } else return response;
}

export function parseUserAndRecord(response) {
  let user = response.data;
  localStorage.setItem(jwtTokenKey, user.token);
  const decodedInfo = jwtDecode(user.token);
  user = { ...user, roles: decodedInfo.roles };
  return user;
}

export function logout(currentUserName) {
  // !!! FAKE LOGOUT LOGIC !!! should be replaced in prod app
  const response = Axios.get(`${rootUrl}/logout/${currentUserName}`); // fake, should be POST
  return response;
}

export function loginUserWithJwt(token) {
  localStorage.setItem(jwtTokenKey, token);
  const userInfo = jwtDecode(token);
  return userInfo;
}

export function removeUserTokenFromStorage() {
  // send logout request to server here
  localStorage.removeItem(jwtTokenKey);
}

// export function getCurrentUser() {
//   try {
//     const jwt = localStorage.getItem(jwtTokenKey); // getting the users from Local Storage!!!
//     const currentUser = jwtDecode(jwt);
//     return currentUser;
//   } catch (ex) {
//     return null;
//   }
// }
