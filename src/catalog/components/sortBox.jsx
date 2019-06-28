import React from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from '../../shared/controls/dropdown';

const SortBox = ({ sortOptions, onSortChange }) => (
  <Dropdown
    name="sortDropdown"
    label="Sorted by:"
    options={sortOptions}
    isOnelineElement
    defaultText="default"
    customClasses="justify-content-end mt-1 mt-lg-0"
    onChange={e => onSortChange(e.currentTarget.value)}
  />
);

SortBox.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBox;
