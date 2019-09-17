import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './Main';
import About from './About';
import { CatalogConnected } from '../../catalog';
import { NotFound, ProtectedRouteConnected } from '../../shared';
import { ProductFormConnected, ProductDetailsConnected } from '../../product';
import { LoginFormConnected, ProfileFormConnected } from '../../user';
import { CartConnected } from '../../cart';
import { OrderConnected, OrderConfirmation } from '../../order';

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
