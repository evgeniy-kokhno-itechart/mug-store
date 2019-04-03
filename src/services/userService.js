export function registerUser(user) {
  const { username, name, address, password } = user;
  console.log(
    `User with name: ${username} and password ${password} regirstered`
  );
  //fake user token witnin roles: ["user"]
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJuYW1lIjoiVXNlciBVc2VyIiwicm9sZXMiOlsidXNlciJdfQ.HHrGj7GXhRFCOF5cRqwpW4zdCGafxybLUHGKahr4vTE";
  return token;
}

export function saveUser() {
  return;
}
