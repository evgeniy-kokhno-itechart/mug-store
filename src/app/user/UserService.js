import { applicationApi } from '../shared';

export default class UserService {
  static registerUser() {
    //  !!! FAKE REGISTRATION LOGIC should be replaced in prod app
    // const response = applicationApi.post('/users/register', userInfo);
    const response = applicationApi.get('/users/2');
    return response;
  }

  static saveUserInfo(editedUserInfo) {
    const response = applicationApi.post('/users/edituser', editedUserInfo);
    return response;
  }
}
