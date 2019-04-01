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
      country: "",
      city: "",
      address: "",
      password: "",
      confirmPassword: ""
    },
    errors: {}
  };

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
          {this.renderInput("username", "Username (a valid E-mail)")}
          {this.renderInput("name", "Name")}
          {this.renderInput("country", "Country")}
          {this.renderInput("city", "City")}
          {this.renderInput("address", "Address")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput(
            "confirmPassword",
            "Confirm Password",
            "password",
            "password"
          )}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
