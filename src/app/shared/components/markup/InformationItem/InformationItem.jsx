import React from 'react';
import { PropTypes } from 'prop-types';
import './InformationItem.scss';

const InformationItem = ({ label, info }) => (
  <div className="information-item">
    <p className="information-item__label">
      {label}
    </p>
    <p className="information-item__info">{info}</p>
  </div>
);

InformationItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InformationItem.defaultProps = {
  info: '',
};

export default InformationItem;
