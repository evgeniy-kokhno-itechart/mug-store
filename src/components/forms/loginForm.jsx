import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./../common/form";
import { loginUser, getCurrentUser } from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    try {
      const { data } = this.state;
      loginUser(data.username, data.password);
      console.log(`User with name: ${data.username} logged in!`);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      // paste error handling logic here
      const errors = { ...this.state.errors };
      this.setState({ errors });
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
