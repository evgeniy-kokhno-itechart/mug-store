import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal } from '../../shared';

class CatalogDeleteAction extends Component {
  handleDeleteAction = () => {
    const { productId, handleAction } = this.props;
    handleAction(productId);
  };

  render() {
    const { productTitle } = this.props;
    return (
      <Modal
        id="product-deletion-confirmation"
        buttonLabel="Delete"
        buttonClasses="btn btn-danger btn-sm"
        title="Confirm product deletion"
        text={`You are about to completely delete ${productTitle} from the database!`}
        textConfirm="Confirm"
        textAbort="Dismiss"
        onConfirm={this.handleDeleteAction}
      />
    );
  }
}

CatalogDeleteAction.propTypes = {
  productId: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default CatalogDeleteAction;
