import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrencies,
  setCurrentCurrency,
  getCurrentCurrency
} from "../services/payService";

class Navbar extends Component {
  state = { currentCurrency: { _id: "", name: "" }, currencyOptions: [] };

  componentDidMount() {
    const currencyOptions = getCurrencies();
    const currentCurrency = getCurrentCurrency();
    this.setState({ currencyOptions, currentCurrency });
  }

  handleCurrencyChange = e => {
    const currency = {
      _id: e.currentTarget.value,
      name: e.currentTarget.selectedOptions[0].text
    };
    window.location.reload();
    setCurrentCurrency(currency);
    this.setState({ currentCurrency: currency });
  };

  render() {
    const { currentCurrency, currencyOptions } = this.state;
    console.log("cartInNavBar", this.props.cart);
    const cartCount = this.props.cart.reduce(
      (sumQty, currentProduct) => sumQty + currentProduct.qty,
      0
    );

    // console.log("currentCurrency", currentCurrency);
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mugStoreNavbar"
          aria-controls="mugStoreNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mugStoreNavbar">
          <NavLink className="navbar-brand" to="/">
            Mug Store
          </NavLink>
          <div className="navbar-nav">
            <NavLink to="/catalog" className=" nav-item nav-link">
              Catalog
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/cart" className="nav-item nav-link">
              Cart
              {cartCount !== 0 ? (
                <span className="badge badge-warning ml-1">{cartCount}</span>
              ) : null}
            </NavLink>
          </div>
        </div>
        <div className="row col-3">
          <div className="col">
            <p className="nav navbar-text">Currency:</p>
            <select
              className="btn-dark dropdown-toggle mx-1 p-1"
              type="dropdown"
              id="dropdownMenuButton"
              value={currentCurrency._id}
              onChange={e => this.handleCurrencyChange(e)}
            >
              {currencyOptions.map(option => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col row">
            {this.props.user ? (
              <React.Fragment>
                <p className="nav navbar-text mr-3">{this.props.user.name}</p>
                <div>
                  {/* className="dropleft"> */}
                  <button
                    className="btn btn-dark dropdown-toggle"
                    type="dropdown"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Profile
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item" to="/myprofile">
                      My Profile
                    </Link>
                    <div className="dropdown-divider" />
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link
                  to="/login"
                  className="nav navbar-text mx-1 col clickable"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav navbar-text mx-1 col clickable"
                >
                  Register
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Navbar);
