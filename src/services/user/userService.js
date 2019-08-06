import Axios from 'axios';
import { rootUrl } from '../general/constants';

export function registerUser() {
  //  !!! FAKE REGISTRATION LOGIC, instead of GET - POST should be used
  const response = Axios.get(`${rootUrl}/users/2`);
  return response;
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJ1c2VyQHVzZXIuY29tIiwibmFtZSI6IlJlZ3VsYXIgVXNlciIsInJvbGVzIjpbInVzZXIiXSwiY291bnRyeSI6IkJlbGFydXMiLCJjaXR5IjoiR29tZWwiLCJhZGRyZXNzIjoiU29tZSBzdHIsIDEwIC0gMjAiLCJwaG9uZSI6IiszNzUyOTExMTExMTEiLCJpYXQiOjE1MTYyMzkwMjJ9.YJX8O1vvZT_X03XrR0vpmSYi2uAWgADkKcMnHur1B3s';
}

export function saveUserInfo() {
  const response = Axios.post(`${rootUrl}/users/edituser`);
  return response;
}
