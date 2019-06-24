import React from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from '../common/dropdown';

const SortBox = ({ sortOptions, onChange }) => (
  <Dropdown
    name="sortDropdown"
    label="Sorted by:"
    options={sortOptions}
    isOnelineElement
    defaultText="default"
    customClasses="justify-content-end mt-1 mt-lg-0"
    onChange={e => onChange(e.currentTarget.value)}
  />
);

SortBox.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortBox;
