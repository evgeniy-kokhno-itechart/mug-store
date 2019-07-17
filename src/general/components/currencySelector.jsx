/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class CurrencySelector extends Component {
  renderSpinner = () => (
    <button className="btn btn-secondary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </button>
  );

  renderError = () => {
    // eslint-disable-next-line no-console
    console.log(this.props.errorMessage);
    return <span className="badge badge-danger">Error</span>;
  };

  renderCurreniesDropdown = () => {
    const { currentCurrencyId, currencyOptions, onCurrencyChange } = this.props;
    return (
      <select
        className="text-white bg-dark border-0 ml-1 mr-3"
        type="dropdown"
        id="currencyDropdownButton"
        value={currentCurrencyId}
        onChange={(e) => {
          onCurrencyChange(
            e.currentTarget.value, // _id
            e.currentTarget.options[e.currentTarget.selectedIndex].text, // name
            // .selectedOptions[0].text doesn't work for IE
          );
        }}
      >
        {currencyOptions.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  render() {
    return (
      <React.Fragment>
        <p className="navbar-text d-inline ">Currency:</p>
        {this.props.isCurrenciesLoading
          ? this.renderSpinner()
          : this.props.hasLoadFailed
            ? this.renderError()
            : this.renderCurreniesDropdown()}
      </React.Fragment>
    );
  }
}

CurrencySelector.propTypes = {
  currentCurrencyId: PropTypes.string.isRequired,
  currencyOptions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  isCurrenciesLoading: PropTypes.bool.isRequired,
  hasLoadFailed: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onCurrencyChange: PropTypes.func.isRequired,
};

CurrencySelector.defaultProps = {
  errorMessage: '',
};

export default CurrencySelector;
