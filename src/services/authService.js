import jwtDecode from 'jwt-decode';

export function loginUser(username, password) {
  if (username === 'superadmin' && password === '12345') {
    //  SuperAdmin token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXSwiY291bnRyeSI6IkJlbGFydXMiLCJjaXR5IjoiTWluc2siLCJhZGRyZXNzIjoiTWVzbmlrb3ZhIHN0ciwgNSAtMTEiLCJwaG9uZSI6IiszNzUyOTAwMDAwMDAiLCJpYXQiOjE1MTYyMzkwMjJ9.MQDSQynD3lZ4MQV0SGpkUW_Hnv19PI2rEeSzMav14nQ';
    localStorage.setItem('token', token);
    const userInfo = jwtDecode(token);
    return userInfo;
  }
  throw new Error('Incorrect username or password');
}

export function loginUserWithJwt(token) {
  localStorage.setItem('token', token);
  const userInfo = jwtDecode(token);
  return userInfo;
}

export function logoutUser() {
  // send logout request to server here
  localStorage.removeItem('token');
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token'); // getting the users from Local Storage!!!
    const currentUser = jwtDecode(jwt);
    return currentUser;
  } catch (ex) {
    return null;
  }
}
