import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { registerUser, saveUser } from "../../services/userService";
import { loginUserWithJwt, getCurrentUser } from "../../services/authService";
import * as actionTypes from "../store/actions";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      name: "",
      country: "",
      city: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: ""
    },
    errors: {},
    user: {}
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (user) {
      this.setState({ user, data: this.mapToViewModel(user) });
    }
  }

  mapToViewModel({ username, name, country, city, address, phone }) {
    return {
      username,
      name,
      country,
      city,
      address,
      phone,
      password: "",
      confirmPassword: ""
    };
  }

  schema = {
    username: Joi.string()
      .email()
      .required()
      .max(100)
      .label("Username"),
    name: Joi.string()
      .required()
      .max(100)
      .label("Name"),
    country: Joi.string()
      .required()
      .max(100)
      .label("Country"),
    city: Joi.string()
      .required()
      .max(100)
      .label("City"),
    address: Joi.string()
      .required()
      .max(250)
      .label("Address"),
    phone: Joi.string()
      .required()
      .min(12)
      .max(17)
      .label("Phone"),
    password: Joi.string()
      .required()
      .min(5)
      .max(200)
      .label("Password"),
    confirmPassword: Joi.string()
      .required()
      .min(5)
      .max(200)
      .label("Confirm Password")
  };

  doSubmit = () => {
    if (!this.state.user) {
      try {
        const { data } = this.state;
        const token = registerUser(data);
        const userInfo = loginUserWithJwt(token);
        this.props.onUserLogin(userInfo);
        window.location = "/";
      } catch (ex) {
        // paste error handling logic here
        const errors = { ...this.state.errors };
        this.setState({ errors });
      }
    } else {
      saveUser(this.state.data);
      window.location = "/";
    }
  };

  render() {
    return (
      <div>
        {this.state.user ? <h1>Edit profile</h1> : <h1>Register</h1>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username (a valid E-mail)")}
          {this.renderInput("name", "Name")}
          {this.renderInput("country", "Country")}
          {this.renderInput("city", "City")}
          {this.renderInput("address", "Address")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput(
            "confirmPassword",
            "Confirm Password",
            "password",
            "password"
          )}
          {this.state.user
            ? this.renderButton("Save")
            : this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUserLogin: userInfo =>
      dispatch({ type: actionTypes.LOGIN_USER, userInfo })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
