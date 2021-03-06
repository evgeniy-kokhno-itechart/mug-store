import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { SearchBox } from '../../../shared';
import SortBox from '../SortBox/SortBox';
import './CatalogTableHeader.scss';

const CatalogTableHeader = ({
  currentUserRoles, searchQuery, sortColumnKey, sortOptions, handleSearch, handleSort,
}) => (
  <div className="catalog__header">
    <div className="catalog-search-box">
      <SearchBox value={searchQuery} onSearchSubmit={handleSearch} key={searchQuery} />
    </div>
    {currentUserRoles.includes('admin') && (
      <Link to="/edit/products/new" className="button button--solid catalog-add-product-btn">
        Add New Product
      </Link>
    )}
    <SortBox sortColumnKey={sortColumnKey} sortOptions={sortOptions} onSortChange={handleSort} customClasses="catalog-sort-box" />
  </div>
);

CatalogTableHeader.propTypes = {
  currentUserRoles: PropTypes.arrayOf(PropTypes.string),
  searchQuery: PropTypes.string,
  sortColumnKey: PropTypes.string.isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
};

CatalogTableHeader.defaultProps = {
  currentUserRoles: [],
  searchQuery: '',
};

export default CatalogTableHeader;
