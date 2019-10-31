import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { Modal } from '../../shared';

class DeleteProductButton extends Component {
  state = { isModalOpened: false };

  handleOpenModal = () => {
    this.setState({ isModalOpened: true });
  }

  handleCloseModal = () => {
    this.setState({ isModalOpened: false });
  }

  handleDeleteAction = () => {
    const { productId, handleDelete } = this.props;
    handleDelete(productId);
  };

  render() {
    const { productTitle } = this.props;
    return (
      <React.Fragment>
        <button type="button" className="button button--solid button--danger focusable" onClick={this.handleOpenModal}>
          <FontAwesomeIcon icon="times" />
        </button>
        { this.state.isModalOpened
          && (
          <Modal
            title="Confirm product deletion"
            text={`You are about to completely delete ${productTitle} from the database!`}
            textConfirm="Confirm"
            textAbort="Dismiss"
            confirmBtnClasses="button-danger"
            onClose={this.handleCloseModal}
            onConfirm={this.handleDeleteAction}
          />
          )
        }
      </React.Fragment>
    );
  }
}

DeleteProductButton.propTypes = {
  productId: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteProductButton;
