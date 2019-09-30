import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

class ItemCounter extends Component {
  handleInputEdited = (e) => {
    // ternary operator was added to avoid NaN when input is empty
    const newValue = e.currentTarget.value;
    const newQuantity = (newValue && newValue > 0) ? parseInt(e.currentTarget.value, 10) : 1;
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
      <div className="input-group input-group-sm mx-auto flex-nowrap item-counter">
        <button
          type="button"
          className='item-counter__btn input-group-prepend btn btn-secondary btn-sm p-1 p-lg-2'
          onClick={this.handleDecremented}
          disabled={item.quantity <= 1 ? 'disabled' : ''}
        >
          <FontAwesomeIcon icon="minus" className="my-auto" />
        </button>

        <input className="form-control inline text-center p-1 p-lg-2" type="text" value={item.quantity} onChange={this.handleInputEdited} />

        <button
          type="button"
          className="item-counter__btn input-group-append btn btn-secondary btn-sm p-1 p-lg-2"
          onClick={this.handleIncremented}
        >
          <FontAwesomeIcon icon="plus" className="my-auto" />
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
