import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../../shared/markup-usage/protectedRoute';
import MainPage from './main';
import Catalog from '../../catalog/containers/catalog';
import NotFound from './notFound';
import ProductForm from '../../product/containers/productForm';
import LoginForm from '../../user/components/loginForm';
import ProfileForm from '../../user/components/profileForm';
import Cart from '../../cart/containers/cart';
import Order from '../../order/containers/order';
import OrderConfirmation from '../../order/components/orderConfirmation';
import ProductDetails from '../../product/containers/productDetails';
import About from './about';

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
