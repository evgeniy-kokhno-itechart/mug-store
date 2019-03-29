import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { registerUser } from "../../services/userService";
import { loginUserWithJwt } from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      name: "",
      address: "",
      password: "",
      passwordConfirmation: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    name: Joi.string()
      .required()
      .label("Name"),
    address: Joi.string()
      .required()
      .label("Address"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    passwordConfirmation: Joi.string()
      .valid(Joi.ref("password"))
      .label("Confirm Password")
  };

  doSubmit = () => {
    try {
      const { data } = this.state;
      const token = registerUser(data);
      loginUserWithJwt(token);
      window.location = "/";
    } catch (ex) {
      // paste error handling logic here
      const errors = { ...this.state.errors };
      this.setState({ errors });
    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
