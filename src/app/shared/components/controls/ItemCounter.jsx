import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

class ItemCounter extends Component {
  handleDecrementClick = () => {
    const { itemId, onDecrementClick } = this.props;
    onDecrementClick(itemId, 1);
  };

  handleIncrementClick = () => {
    const { itemId, onIncrementClick } = this.props;
    onIncrementClick(itemId, 1);
  };

  handleCountChange = (e) => {
    const { itemId, onCountChange } = this.props;
    const val = e.currentTarget.value ? parseInt(e.currentTarget.value, 10) : 1;
    // ternary operator was added to avoid NaN when input is empty
    onCountChange(itemId, val);
  };

  render() {
    const { count } = this.props;
    return (
      <div className="input-group input-group-sm mx-auto flex-nowrap item-counter">
        <button
          type="button"
          className={`item-counter__btn input-group-prepend btn btn-secondary btn-sm p-1 p-lg-2 ${count > 1 ? '' : 'disabled'}`}
          onClick={this.handleDecrementClick}
        >
          <FontAwesomeIcon icon="minus" className="my-auto" />
        </button>

        <input className="form-control inline text-center p-1 p-lg-2" type="text" value={count} onChange={this.handleCountChange} />

        <button
          type="button"
          className="item-counter__btn input-group-append btn btn-secondary btn-sm p-1 p-lg-2"
          onClick={this.handleIncrementClick}
        >
          <FontAwesomeIcon icon="plus" className="my-auto" />
        </button>
      </div>
    );
  }
}

ItemCounter.propTypes = {
  count: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
  onCountChange: PropTypes.func.isRequired,
};

export default ItemCounter;
