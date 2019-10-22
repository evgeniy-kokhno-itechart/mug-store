/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DropdownInline, Spinner } from '../../../shared';
import './CurrenciesDropdown.scss';

class CurrenciesDropdown extends Component {
  handleCurrencyChange = (e) => {
    const { currencyState, onChange } = this.props;
    onChange(currencyState.currencies.find(currency => currency.id === e.currentTarget.value));
  };

  renderSpinner = () => <Spinner spinnerClasses="spinner--small text--white" />;

  renderError = () => <p className="curr-dropdown__error text--white ">{this.props.currencyState.currenciesStatus.error}</p>;

  renderDropdown = () => {
    const { currencyState } = this.props;
    return (
      <DropdownInline
        name="currencyDropdown"
        label='Currency:'
        value={currencyState.currentCurrency.id}
        options={currencyState.currencies}
        labelClasses="curr-dropdown__label text--gray"
        selectClasses='curr-dropdown__selector text--white'
        onChange={this.handleCurrencyChange}
      />
    );
  }

  render() {
    const { currencyState } = this.props;
    return (
      <div className="curr-dropdown">
        {currencyState.currenciesStatus.isInProcess
          ? this.renderSpinner()
          : currencyState.currenciesStatus.hasFailed
            ? this.renderError()
            : this.renderDropdown()}
      </div>
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
