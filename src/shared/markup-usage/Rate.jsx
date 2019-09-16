import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { PropTypes } from 'prop-types';
import '../../styles/Rate.css';

class Rate extends Component {
  composeStars = () => {
    const { rate: rateString } = this.props;

    const starsCountTotal = 5;
    const rate = parseFloat(rateString);
    const floatPart = rate % 1;
    const integerPart = Math.trunc(rate);

    const solidStarsArray = [...Array(integerPart)].map(() => solidStar);
    const halfStarArray = floatPart ? [halfStar] : [];
    const emptyStarsCount = Math.floor(starsCountTotal - solidStarsArray.length - floatPart);
    const emptyStarsArray = [...Array(emptyStarsCount)].map(() => emptyStar);

    const stars = [...solidStarsArray, ...halfStarArray, ...emptyStarsArray];
    return stars;
  };

  renderIcon = (icon, id) => <FontAwesomeIcon key={id} icon={icon} color="orange" />;

  render() {
    const starsToRender = this.composeStars();

    return <div className="rate">{starsToRender.map((currentValue, index) => this.renderIcon(currentValue, index))}</div>;
  }
}

Rate.propTypes = {
  rate: PropTypes.string.isRequired,
};

export default Rate;
