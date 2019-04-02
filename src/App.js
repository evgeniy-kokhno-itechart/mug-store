import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCartArrowDown,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
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
import Cart from "./components/cart/cart";
import OrderForm from "./components/cart/orderForm";
import ProtectedRoute from "./components/common/protectedRoute";
import OrderConfirmation from "./components/cart/orderConfirmation";
import "./App.css";

library.add(faSearch, faCartArrowDown, faTrash);

class App extends Component {
  state = { user: null };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user: user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} />
        <div id="bootstrap-overrides" className="container">
          <Switch>
            <ProtectedRoute path="/products/:id" component={ProductForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/order/mycart" component={OrderForm} />
            <Route path="/order" component={OrderForm} />
            <Route path="/orderconfirm" component={OrderConfirmation} />
            <Route path="/cart" component={Cart} />
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
