import jwtDecode from 'jwt-decode';
import { applicationApi } from '../shared';

const jwtTokenKey = 'token';

export default class AuthService {
  static parseUserToken(response) {
    let user = response.data;
    localStorage.setItem(jwtTokenKey, user.token);
    const decodedInfo = jwtDecode(user.token);
    user = { ...user, roles: decodedInfo.roles };
    return user;
  }

  static loginUserWithJwt(token) {
    localStorage.setItem(jwtTokenKey, token);
    const userInfo = jwtDecode(token);
    return userInfo;
  }

  static removeUserTokenFromStorage() {
    localStorage.removeItem(jwtTokenKey);
  }

  static login(username, password) {
    // !!! FAKE AUTHENTICATION LOGIC !!! should be replaced in prod app
    let response;
    let isKnownUser = false;
    if (username === process.env.REACT_APP_ADMIN_NAME && password === process.env.REACT_APP_ADMIN_PASS) {
      isKnownUser = true;
      response = applicationApi.get('/users/1');
    }
    if (username === process.env.REACT_APP_USER_NAME && password === process.env.REACT_APP_USER_PASS) {
      isKnownUser = true;
      response = applicationApi.get('/users/2');
    }
    if (username === process.env.REACT_APP_TEST_NAME && password === process.env.REACT_APP_TEST_PASS) {
      isKnownUser = true;
      response = applicationApi.get('/users/2');
    }
    if (!isKnownUser) {
      throw new Error('Incorrect username or password');
    } else return response;
  }

  static logout(currentUserId) {
    // !!! FAKE LOGOUT LOGIC !!! should be replaced in prod app
    const response = applicationApi.post(`/logout/${currentUserId}`);
    this.removeUserTokenFromStorage(); // !!!!!!!!!!! CHECK THIS
    return response;
  }
}
