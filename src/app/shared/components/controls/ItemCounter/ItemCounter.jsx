import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './ItemCounter.scss';

class ItemCounter extends Component {
  handleInputEdited = (e) => {
    // ternary operator was added to avoid NaN when input is empty
    const newValue = e.target.value;
    const newQuantity = (newValue && newValue > 0) ? parseInt(newValue, 10) : 1;
    this.handleQuantityChange(newQuantity);
  }

  handleDecremented = () => {
    let newQuantity = this.props.item.quantity;
    newQuantity--;
    this.handleQuantityChange(newQuantity);
  };

  handleIncremented = () => {
    let newQuantity = this.props.item.quantity;
    newQuantity++;
    this.handleQuantityChange(newQuantity);
  };

  handleQuantityChange = (newQuantity) => {
    this.props.onQuantityChanged({ ...this.props.item, quantity: newQuantity });
  };

  render() {
    const { item } = this.props;
    return (
      <div className="item-counter">
        <button
          type="button"
          className='item-counter__btn counter-btn-decrease focusable'
          onClick={this.handleDecremented}
          disabled={item.quantity <= 1 ? 'disabled' : ''}
        >
          <FontAwesomeIcon icon="minus" />
        </button>

        <input className="item-counter__input focusable" type="text" value={item.quantity} onChange={this.handleInputEdited} />

        <button
          type="button"
          className="item-counter__btn counter-btn-increase focusable"
          onClick={this.handleIncremented}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    );
  }
}

ItemCounter.propTypes = {
  item: PropTypes.PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onQuantityChanged: PropTypes.func.isRequired,
};

export default ItemCounter;
