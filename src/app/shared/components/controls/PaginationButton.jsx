import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PaginationButton extends Component {
  handleChange = () => {
    const { page, handlePageChange } = this.props;
    handlePageChange(page);
  };

  render() {
    const { page } = this.props;
    return (
      <button type="button" className="page-link clickable" onClick={this.handleChange}>
        {page}
      </button>
    );
  }
}

PaginationButton.propTypes = {
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default PaginationButton;
