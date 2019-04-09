import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCartArrowDown,
  faTrash,
  faMinus,
  faPlus,
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser } from "./services/authService";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
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
import ProductDetails from "./components/catalog/productDetails";
import About from "./components/about";
import "./App.css";

library.add(
  faSearch,
  faCartArrowDown,
  faTrash,
  faMinus,
  faPlus,
  faArrowRight,
  faArrowLeft
);

class App extends Component {
  state = { user: null, cartCount: 0 };

  componentDidMount() {
    const user = getCurrentUser();
    const cartCount = this.getCartQuantity();
    this.setState({ user, cartCount });
  }

  getCartQuantity(cart) {
    return this.getCart().reduce(
      (sumQty, currentProduct) => sumQty + currentProduct.qty,
      0
    );
  }

  getCart = () => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    return cart;
  };

  handleBuyNow = (product, quantity) => {
    let cart = this.getCart();
    let id = product._id.toString();

    let existedProduct = cart.find(prod => prod._id === id);
    if (existedProduct)
      existedProduct.qty = existedProduct.qty + parseInt(quantity);
    else cart.push({ _id: id, qty: quantity });

    // let currentProduct = cart.find(prod => prod._id === id)
    //   ? cart.find(prod => prod._id === id)
    //   : { _id: id, qty: 0 };
    // currentProduct.qty = currentProduct.qty + parseInt(quantity);
    // cart.push(currentProduct);

    // cart[id] = cart[id] ? cart[id] : 0;
    // let qty = cart[id] + parseInt(quantity);
    // if (this.props.product.available_quantity < qty) {
    //   cart[id] = this.props.product.available_quantity;
    // } else {
    // cart[id] = qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cartCount: this.getCartQuantity() });
  };

  handleCartChange = () => {
    this.setState({ cartCount: this.getCartQuantity() });
  };

  render() {
    const { user, cartCount } = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} cartCount={cartCount} />
        <div id="bootstrap-overrides" className="container">
          <div id="content-wrap">
            <Switch>
              <ProtectedRoute
                path="/edit/products/:id"
                component={ProductForm}
              />
              <Route
                path="/products/:id"
                render={props => (
                  <ProductDetails {...props} onBuyNow={this.handleBuyNow} />
                )}
              />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={LoginForm} />
              <ProtectedRoute path="/myprofile" component={RegisterForm} />
              <Route path="/register" component={RegisterForm} />
              <Route
                path="/catalog"
                render={() => <Catalog onBuyNow={this.handleBuyNow} />}
              />
              <Route path="/about" component={About} />
              <Route path="/order/mycart" component={OrderForm} />
              <Route path="/order" component={OrderForm} />
              <Route
                path="/orderconfirm"
                render={props => (
                  <OrderConfirmation
                    {...props}
                    onCartChange={this.handleCartChange}
                  />
                )}
              />
              <Route
                path="/cart"
                render={props => (
                  <Cart {...props} onCartChange={this.handleCartChange} />
                )}
              />
              <Route path="/main" component={MainPage} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/main" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
