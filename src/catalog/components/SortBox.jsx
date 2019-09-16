import React from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from '../../shared/controls/Dropdown';

const SortBox = ({ sortColumnKey, sortOptions, onSortChange }) => (
  <Dropdown
    name="sortDropdown"
    label="Sorted by:"
    options={sortOptions}
    value={sortColumnKey}
    isOnelineElement
    customClasses="justify-content-end mt-1 mt-lg-0"
    onValueChange={onSortChange}
  />
);

SortBox.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumnKey: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBox;
