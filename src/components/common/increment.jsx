import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Increment extends Component {
  render() {
    const {
      quantity,
      productId,
      onIncrementClick,
      onDecrementClick,
      onQuantityChange
    } = this.props;

    return (
      <div
        className="input-group input-group-sm mx-auto flex-nowrap"
        style={{ fontSize: "1rem" }}
      >
        <button
          id="form-button-left"
          className={
            "input-group-prepend btn btn-secondary btn-sm p-1 p-lg-2" +
            (quantity > 1 ? "" : " disabled")
          }
          style={{ fontSize: "0.75rem" }}
          onClick={() => onDecrementClick(productId)}
        >
          <FontAwesomeIcon icon="minus" className="my-auto" />
        </button>
        <input
          // id="form-input"
          className="form-control inline text-center p-1 p-lg-2"
          type="text"
          // size="1"
          // align="middle"
          style={{ maxWidth: "35%" }}
          value={quantity}
          onChange={e => {
            const val = e.currentTarget.value
              ? parseInt(e.currentTarget.value)
              : 1; //ternary operator was added to avoid NaN when input is empty
            onQuantityChange(val, productId);
          }}
        />
        <button
          id="form-button-right"
          className="input-group-append btn btn-secondary btn-sm p-1 p-lg-2"
          style={{ fontSize: "0.75rem" }}
          onClick={() => onIncrementClick(productId)}
        >
          <FontAwesomeIcon icon="plus" className="my-auto" />
        </button>
      </div>
    );
  }
}

export default Increment;
