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
      const errors = {};
      errors["password"] = ex.message;
      this.setState({ errors });
    }
  };

  render() {
    if (this.props.currentUser.name) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <h1 className="text-center m-3">Login</h1>
        <form
          className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto"
          onSubmit={this.handleSubmit}
        >
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login", "w-100")}
        </form>
      </React.Fragment>
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
