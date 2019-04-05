import { Component } from "react";
import { logoutUser } from "../../services/authService";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("cart");
    logoutUser();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
