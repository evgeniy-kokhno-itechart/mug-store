import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser } from "./services/authService";
import Navbar from "./components/navbar";
// import logo from "./logo.svg";
import MainPage from "./components/main";
import Catalog from "./components/catalog/catalog";
import NotFound from "./components/common/notFound";
import ProductForm from "./components/forms/productForm";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/common/logout";
import RegisterForm from "./components/forms/registerForm";
import "./App.css";

library.add(faSearch, faCartArrowDown);

class App extends Component {
  state = { user: null };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user: user });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <div id="bootstrap-overrides" className="container">
          <Switch>
            <Route path="/products/:id" component={ProductForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route
              path="/catalog"
              render={props => <Catalog {...props} user={this.state.user} />}
            />
            <Route path="/main" component={MainPage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/main" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
