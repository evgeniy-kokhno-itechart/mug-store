import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRouteConnected from '../../shared/markup-usage/ProtectedRoute';
import MainPage from './Main';
import CatalogConnected from '../../catalog/containers/Catalog';
import NotFound from './NotFound';
import ProductFormConnected from '../../product/containers/ProductForm';
import LoginFormConnected from '../../user/components/LoginForm';
import ProfileFormConnected from '../../user/components/ProfileForm';
import CartConnected from '../../cart/containers/Cart';
import OrderConnected from '../../order/containers/Order';
import OrderConfirmation from '../../order/components/OrderConfirmation';
import ProductDetailsConnected from '../../product/containers/ProductDetails';
import About from './About';

const Routes = () => (
  <Switch>
    <ProtectedRouteConnected path="/edit/products/:id" component={ProductFormConnected} />
    <Route path="/products/:id" component={ProductDetailsConnected} />
    <Route path="/login" component={LoginFormConnected} />
    <ProtectedRouteConnected path="/myprofile" component={ProfileFormConnected} />
    <Route path="/register" component={ProfileFormConnected} />
    <Route path="/catalog" component={CatalogConnected} />
    <Route path="/about" component={About} />
    <Route path="/order/mycart" component={OrderConnected} />
    <Route path="/order" component={OrderConnected} />
    <Route path="/orderconfirm" component={OrderConfirmation} />
    <Route path="/cart" component={CartConnected} />
    <Route path="/main" component={MainPage} />
    <Route path="/not-found" component={NotFound} />
    <Redirect from="/" exact to="/main" />
    <Redirect to="/not-found" />
  </Switch>
);

export default Routes;
