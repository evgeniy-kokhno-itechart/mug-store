import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../../shared/markup-usage/ProtectedRoute';
import MainPage from './Main';
import Catalog from '../../catalog/containers/Catalog';
import NotFound from './NotFound';
import ProductForm from '../../product/containers/ProductForm';
import LoginForm from '../../user/components/LoginForm';
import ProfileForm from '../../user/components/ProfileForm';
import Cart from '../../cart/containers/Cart';
import Order from '../../order/containers/Order';
import OrderConfirmation from '../../order/components/OrderConfirmation';
import ProductDetails from '../../product/containers/ProductDetails';
import About from './About';

const Routes = () => (
  <Switch>
    <ProtectedRoute path="/edit/products/:id" component={ProductForm} />
    <Route path="/products/:id" component={ProductDetails} />
    <Route path="/login" component={LoginForm} />
    <ProtectedRoute path="/myprofile" component={ProfileForm} />
    <Route path="/register" component={ProfileForm} />
    <Route path="/catalog" component={Catalog} />
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

export default Routes;
