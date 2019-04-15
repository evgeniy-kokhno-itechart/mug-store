import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { connect } from "react-redux";
import Form from "./../common/form";
import { loginUser } from "../../services/authService";
import * as actionTypes from "../store/actions";

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
      const userInfo = loginUser(data.username, data.password); //get user's token from the back-end,store it in localStorage and get user's info
      this.props.onUserLogin(userInfo);
      // console.log(`User with name: ${data.username} logged in!`);
      console.log("userInfo", userInfo);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      // paste error handling logic here
      const errors = { ...this.state.errors };
      this.setState({ errors });
    }
  };

  render() {
    if (this.props.currentUser.name) return <Redirect to="/" />;
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

const mapStateToProps = state => {
  return { currentUser: state.userState.currentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLogin: userInfo =>
      dispatch({ type: actionTypes.LOGIN_USER, userInfo })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
