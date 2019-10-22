import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const ToCatalogButton = ({ customClasses }) => (
  <Link className={`button button-solid ${customClasses}`} to="/catalog">
    Back To Catalog
  </Link>
);

ToCatalogButton.propTypes = {
  customClasses: PropTypes.string,
};

ToCatalogButton.defaultProps = {
  customClasses: '',
};

export default ToCatalogButton;
