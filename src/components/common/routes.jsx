import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProtectedRoute from './protectedRoute';
import MainPage from '../main';
import Catalog from '../catalog/catalog';
import NotFound from './notFound';
import ProductForm from '../forms/productForm';
import LoginForm from '../forms/loginForm';
import Logout from './logout';
import ProfileForm from '../forms/profileForm';
import Cart from '../cart/cart';
import OrderForm from '../cart/orderForm';
import OrderConfirmation from '../cart/orderConfirmation';
import ProductDetails from '../catalog/productDetails';
import About from '../about';

const Routes = props => (
  <Switch>
    <ProtectedRoute path="/edit/products/:id" component={ProductForm} />
    <Route path="/products/:id" component={ProductDetails} />
    <Route path="/logout" component={Logout} />
    <Route path="/login" component={LoginForm} />
    <ProtectedRoute path="/myprofile" component={ProfileForm} />
    <Route path="/register" component={ProfileForm} />
    <Route path="/catalog" render={() => <Catalog onBuyNow={props.onBuyNowTriggered} />} />
    <Route path="/about" component={About} />
    <Route path="/order/mycart" component={OrderForm} />
    <Route path="/order" component={OrderForm} />
    <Route path="/orderconfirm" component={OrderConfirmation} />
    <Route path="/cart" component={Cart} />
    <Route path="/main" component={MainPage} />
    <Route path="/not-found" component={NotFound} />
    <Redirect from="/" exact to="/main" />
    <Redirect to="/not-found" />
  </Switch>
);

Routes.propTypes = {
  onBuyNowTriggered: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onBuyNowTriggered: (product, quantity) => dispatch({ type: 'ADD_PRODUCT', cart: { product, quantity } }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Routes);
