import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/navbar";
// import logo from "./logo.svg";
import MainPage from "./components/main";
import Catalog from "./components/catalog/catalog";
import NotFound from "./components/common/notFound";
import ProductForm from "./components/forms/productForm";
import "./App.css";

library.add(faSearch, faCartArrowDown);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div id="bootstrap-overrides" className="container">
          <Switch>
            <Route path="/products/:id" component={ProductForm} />
            <Route path="/catalog" component={Catalog} />
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
