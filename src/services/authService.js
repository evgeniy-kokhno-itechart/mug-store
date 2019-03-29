import jwtDecode from "jwt-decode";

export function loginUser(username, password) {
  if (username === "superadmin" && password === "12345") {
    //SuperAdmin token
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0.H41ge6kcTIBz7WKYNLTxwPWIhlInmLY7jUnFP6WfO14";
    localStorage.setItem("token", token);
  } else throw new Error("Incorrect username or password");
}

export function loginUserWithJwt(token) {
  localStorage.setItem("token", token);
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token"); //getting the users from Local Storage!!!
    const currentUser = jwtDecode(jwt);
    console.log("currentUserFromStorage", currentUser);
    return currentUser;
  } catch (ex) {
    return null;
  }
}
