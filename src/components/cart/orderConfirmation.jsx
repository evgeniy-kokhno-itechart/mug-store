import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as actionTypes from '../../store/actions';

class OrderConfirmation extends Component {
  componentDidMount() {
    const { onCartChange } = this.props;
    onCartChange();
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="text-center m-3">
          Thank you for your order!
          <br />
          <br />
          Our operator will call you shortly.
        </h2>
        <div className="d-flex">
          <Link className="btn btn-secondary mt-3 mx-auto w-50" to="/catalog">
            Back to Catalog
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

OrderConfirmation.propTypes = {
  onCartChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCartChange: () => dispatch({ type: actionTypes.CLEAR_CART }),
});

export default connect(
  null,
  mapDispatchToProps,
)(OrderConfirmation);
