import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

class OrderConfirmation extends Component {
  componentDidMount() {
    this.props.onCartChange();
  }

  render() {
    // localStorage.removeItem("cart");
    return (
      <React.Fragment>
        <h2 className="text-center m-3">
          Thank you for your order!
          <br />
          <br />
          Our operator will call you shortly.
        </h2>
        <Link className="btn btn-secondary mt-3" to="/catalog">
          Back to Catalog
        </Link>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCartChange: () => dispatch({ type: actionTypes.CLEAR_CART })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OrderConfirmation);
