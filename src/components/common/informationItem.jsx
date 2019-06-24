import React from 'react';
import { PropTypes } from 'prop-types';

const InformationItem = ({ label, info }) => (
  <div className="row justify-content-center mx-3 my-2 mx-md-2">
    <span className="col-md-4 text-md-right px-0 px-md-1">
      <b>{label}</b>
    </span>
    <span className="col-md-4 text-md-left px-0 px-md-1">{info}</span>
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
