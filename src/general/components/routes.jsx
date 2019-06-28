import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProtectedRoute from '../../shared/markup-usage/protectedRoute';
import MainPage from './main';
import Catalog from '../../catalog/containers/catalog';
import NotFound from './notFound';
import ProductForm from '../../product/containers/productForm';
import LoginForm from '../../user/components/loginForm';
import Logout from '../../user/components/logout';
import ProfileForm from '../../user/components/profileForm';
import Cart from '../../cart/containers/cart';
import Order from '../../order/containers/order';
import OrderConfirmation from '../../order/containers/orderConfirmation';
import ProductDetails from '../../product/containers/productDetails';
import About from './about';

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
    <Route path="/order/mycart" component={Order} />
    <Route path="/order" component={Order} />
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
