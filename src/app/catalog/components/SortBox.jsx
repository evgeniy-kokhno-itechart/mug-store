import React from 'react';
import { PropTypes } from 'prop-types';
import { DropdownInline } from '../../shared';

const SortBox = ({ sortColumnKey, sortOptions, onSortChange }) => (
  <DropdownInline
    name="sortDropdown"
    label="Sorted by:"
    options={sortOptions}
    value={sortColumnKey}
    wrapperClasses="justify-content-end mt-1 mt-lg-0"
    selectClasses='form-control'
    onChange={onSortChange}
  />
);

SortBox.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumnKey: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBox;
