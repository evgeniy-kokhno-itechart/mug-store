import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Increment extends Component {
  //   state = { quantity: 1 };

  //   componentDidMount() {
  //     this.setState({ quantity: parseInt(this.props.quantity) });
  //   }

  render() {
    const {
      quantity,
      productId,
      onIncrementClick,
      onDecrementClick,
      onQuantityChange
    } = this.props;

    return (
      <div className="h-25">
        <button
          id="form-button-left"
          className={
            quantity > 1
              ? "btn btn-secondary btn-sm inline-block"
              : "btn btn-secondary btn-sm disabled inline-block"
          }
          onClick={() => onDecrementClick(productId)}
        >
          <div>
            <FontAwesomeIcon icon="minus" />
          </div>
        </button>
        <input
          id="form-input"
          className="inline-block"
          style={{ textAlign: "center" }}
          type="text"
          size="1"
          align="middle"
          value={quantity}
          onChange={e => onQuantityChange(e.currentTarget.value, productId)}
        />
        <button
          id="form-button-right"
          className="btn btn-secondary btn-sm inline-block"
          onClick={() => onIncrementClick(productId)}
        >
          <div>
            <FontAwesomeIcon icon="plus" />
          </div>
        </button>
      </div>
    );
  }
}

export default Increment;
