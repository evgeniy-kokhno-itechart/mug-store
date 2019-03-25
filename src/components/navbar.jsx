import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {
    userName: ""
  };

  componentDidMount() {
    this.setState({ userName: "Test Name" });
  }

  render() {
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
            </NavLink>
          </div>
        </div>
        <p className="nav navbar-text mr-3">{this.state.userName}</p>
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Profile
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="/myprofile">
              My Profile
            </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/logout">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
