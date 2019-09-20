/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DropdownInline, Spinner } from '../../shared';

class CurrenciesDropdown extends Component {
  handleCurrencyChange = (e) => {
    const { currencyState, onChange } = this.props;
    onChange(currencyState.currencies.find(currency => currency.id === e.currentTarget.value));
  };

  render() {
    const { currencyState } = this.props;
    return (
      currencyState.currenciesStatus.isInProcess
        ? <Spinner spinnerClasses="spinner-border-sm text-light" wrapperClasses="d-inline mr-3" />
        : currencyState.currenciesStatus.hasFailed
          ? <span className="badge badge-danger">{this.props.currencyState.currenciesStatus.error}</span>
          : (
            <DropdownInline
              name="currencyDropdown"
              label='Currency:'
              value={currencyState.currentCurrency.id}
              options={currencyState.currencies}
              wrapperClasses="navbar-text d-inline"
              labelClasses="d-inline"
              selectClasses='text-white bg-dark border-0 mr-3'
              onChange={this.handleCurrencyChange}
            />
          )
    );
  }
}

CurrenciesDropdown.propTypes = {
  currencyState: PropTypes.shape({
    currentCurrency: PropTypes.shape({ id: PropTypes.string }),
    currencies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
    currenciesStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
  }),
  onChange: PropTypes.func.isRequired,
};

CurrenciesDropdown.defaultProps = {
  currencyState: {
    currentCurrency: { id: '0' },
    currencies: [],
    currenciesStatus: {
      isInProcess: true,
      hasFailed: false,
      error: '',
    },
  },
};

export default CurrenciesDropdown;
