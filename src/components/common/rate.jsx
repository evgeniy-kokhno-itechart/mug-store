import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar
} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

class Rate extends Component {
  state = {};

  renderIcon = (icon, id) => {
    return <FontAwesomeIcon key={id} icon={icon} color="orange" />;
  };
  render() {
    const { rate } = this.props;
    const starsCountTotal = 5;
    const floatPart = rate % 1;
    const integerPart = Math.trunc(rate);
    const solidStarsArray = [...Array(integerPart)].map(() => solidStar);
    const halfStarArray = floatPart ? [halfStar] : [];
    const emptyStarsCount = Math.floor(
      starsCountTotal - solidStarsArray.length - floatPart
    );
    const emptyStarsArray = [...Array(emptyStarsCount)].map(() => emptyStar);
    const stars = [...solidStarsArray, ...halfStarArray, ...emptyStarsArray];
    return (
      <div style={{ fontSize: "0.5rem" }}>
        {stars.map((currentValue, index) =>
          this.renderIcon(currentValue, index)
        )}
      </div>
    );
  }
}

export default Rate;
