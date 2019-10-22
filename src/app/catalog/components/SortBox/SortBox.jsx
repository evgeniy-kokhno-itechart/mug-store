import React from 'react';
import { PropTypes } from 'prop-types';
import { DropdownInline } from '../../../shared';
import './SortBox.scss';

const SortBox = ({ sortColumnKey, sortOptions, onSortChange }) => (
  <DropdownInline
    name="sortDropdown"
    label="Sorted by"
    options={sortOptions}
    value={sortColumnKey}
    wrapperClasses="sort-box"
    selectClasses='sort-box__dropdown'
    onChange={onSortChange}
  />
);

SortBox.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumnKey: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBox;
