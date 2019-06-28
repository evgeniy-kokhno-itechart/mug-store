import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as cartActionTypes from '../../cart/cartActions';
import ToCatalogButton from '../../catalog/components/toCatalogButton';

class OrderConfirmation extends Component {
  componentDidMount() {
    this.props.onCartClear();
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center m-3">
          Thank you for your order!
          <br />
          <br />
          Our operator will call you shortly.
        </h1>
        <div className="d-flex">
          <ToCatalogButton customClasses="mt-3 mx-auto w-50" />
        </div>
      </React.Fragment>
    );
  }
}

OrderConfirmation.propTypes = {
  onCartClear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCartClear: () => dispatch({ type: cartActionTypes.CLEAR_CART }),
});

export default connect(
  null,
  mapDispatchToProps,
)(OrderConfirmation);
