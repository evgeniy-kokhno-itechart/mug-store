/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../shared/markup-usage/Spinner';

class CurrenciesDropdown extends Component {
  renderSpinner = () => (
    <button className="btn btn-secondary" type="button" disabled>
      <Spinner customSizeClassName="spinner-border-sm" />
    </button>
  );

  renderError = () => {
    // eslint-disable-next-line no-console
    console.log(this.props.errorMessage);
    return <span className="badge badge-danger">{this.props.errorMessage}</span>;
  };

  handleCurrencyChange = (e) => {
    const { currencyOptions, onCurrencyChange } = this.props;
    onCurrencyChange(currencyOptions.find(currency => currency.id === e.currentTarget.value));
  };

  renderCurreniesDropdown = () => {
    const { currentCurrencyId, currencyOptions } = this.props;
    return (
      <select
        className="text-white bg-dark border-0 ml-1 mr-3"
        type="dropdown"
        id="currencyDropdownButton"
        value={currentCurrencyId}
        onChange={this.handleCurrencyChange}
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

CurrenciesDropdown.propTypes = {
  currentCurrencyId: PropTypes.string.isRequired,
  currencyOptions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  isCurrenciesLoading: PropTypes.bool,
  hasLoadFailed: PropTypes.bool,
  errorMessage: PropTypes.string,
  onCurrencyChange: PropTypes.func.isRequired,
};

CurrenciesDropdown.defaultProps = {
  isCurrenciesLoading: false,
  hasLoadFailed: false,
  errorMessage: '',
};

export default CurrenciesDropdown;
