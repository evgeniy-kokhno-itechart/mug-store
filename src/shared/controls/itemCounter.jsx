import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

const ItemCounter = ({
  count, itemId, onIncrementClick, onDecrementClick, onCountChange,
}) => (
  <div className="input-group input-group-sm mx-auto flex-nowrap" style={{ fontSize: '1rem' }}>
    <button
      type="button"
      id="form-button-left"
      className={`input-group-prepend btn btn-secondary btn-sm p-1 p-lg-2 ${count > 1 ? '' : 'disabled'}`}
      style={{ fontSize: '0.75rem' }}
      onClick={() => onDecrementClick(itemId)}
    >
      <FontAwesomeIcon icon="minus" className="my-auto" />
    </button>
    <input
      // id="form-input"
      className="form-control inline text-center p-1 p-lg-2"
      type="text"
      // size="1"
      // align="middle"
      style={{ maxWidth: '35%' }}
      value={count}
      onChange={(e) => {
        const val = e.currentTarget.value ? parseInt(e.currentTarget.value, 10) : 1;
        // ternary operator was added to avoid NaN when input is empty
        onCountChange(val, itemId);
      }}
    />
    <button
      type="button"
      id="form-button-right"
      className="input-group-append btn btn-secondary btn-sm p-1 p-lg-2"
      style={{ fontSize: '0.75rem' }}
      onClick={() => onIncrementClick(itemId)}
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
