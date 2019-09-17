import { applicationApi } from '../shared';

export default class UserService {
  static registerUser(userInfo) {
    //  !!! FAKE REGISTRATION LOGIC should be replaced in prod app
    const response = applicationApi.post('/users/register', userInfo);
    return response;
  }

  static saveUserInfo() {
    const response = applicationApi.post('/users/edituser');
    return response;
  }
}
