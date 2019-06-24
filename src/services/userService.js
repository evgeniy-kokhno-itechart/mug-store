export function registerUser(user) {
  const { username, password } = user;
  console.log(`User with name: ${username} and password ${password} registered`);
  // fake user token witnin roles: ["user"]
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJ1c2VyQHVzZXIuY29tIiwibmFtZSI6IlJlZ3VsYXIgVXNlciIsInJvbGVzIjpbInVzZXIiXSwiY291bnRyeSI6IkJlbGFydXMiLCJjaXR5IjoiR29tZWwiLCJhZGRyZXNzIjoiU29tZSBzdHIsIDEwIC0gMjAiLCJwaG9uZSI6IiszNzUyOTExMTExMTEiLCJpYXQiOjE1MTYyMzkwMjJ9.YJX8O1vvZT_X03XrR0vpmSYi2uAWgADkKcMnHur1B3s';
  return token;
}

export function saveUser() {}
