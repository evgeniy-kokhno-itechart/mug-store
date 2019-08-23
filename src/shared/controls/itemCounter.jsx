import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import '../../styles/ItemCounter.css';

const ItemCounter = ({
  count, itemId, onIncrementClick, onDecrementClick, onCountChange,
}) => (
  <div className="input-group input-group-sm mx-auto flex-nowrap">
    <button
      type="button"
      className={`item_counter__btn input-group-prepend btn btn-secondary btn-sm p-1 p-lg-2 ${count > 1 ? '' : 'disabled'}`}
      onClick={() => onDecrementClick(itemId, 1)}
    >
      <FontAwesomeIcon icon="minus" className="my-auto" />
    </button>

    <input
      className="form-control inline text-center p-1 p-lg-2"
      type="text"
      value={count}
      onChange={(e) => {
        const val = e.currentTarget.value ? parseInt(e.currentTarget.value, 10) : 1;
        // ternary operator was added to avoid NaN when input is empty
        onCountChange(itemId, val);
      }}
    />

    <button
      type="button"
      className="item_counter__btn input-group-append btn btn-secondary btn-sm p-1 p-lg-2"
      onClick={() => onIncrementClick(itemId, 1)}
    >
      <FontAwesomeIcon icon="plus" className="my-auto" />
    </button>
  </div>
);

ItemCounter.propTypes = {
  count: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
  onCountChange: PropTypes.func.isRequired,
};

export default ItemCounter;
