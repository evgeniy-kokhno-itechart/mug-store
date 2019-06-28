import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import SearchBox from '../../shared/controls/searchBox';
import SortBox from './sortBox';

const ProductTableHeader = ({
  currentUserRoles, searchQuery, sortOptions, handleSearch, handleSort,
}) => (
  <div className="row justify-content-between mx-1 mx-sm-2">
    <div className="col-12 col-md-5 col-lg-4 col-xl-3">
      <SearchBox value={searchQuery} onSubmit={handleSearch} key={searchQuery} />
    </div>
    {currentUserRoles.includes('admin') && (
      <div className="col-12 col-md-4 col-lg-3 col-xl-3">
        <Link to="/edit/products/new" className="btn btn-secondary mt-1 mt-md-0 w-100 px-md-2">
          Add New Product
        </Link>
      </div>
    )}
    <div className="col-12 col-md col-lg-3 col-xl-2">
      <SortBox sortOptions={sortOptions} onSortChange={handleSort} />
    </div>
  </div>
);

ProductTableHeader.propTypes = {
  currentUserRoles: PropTypes.arrayOf(PropTypes.string),
  searchQuery: PropTypes.string,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string })).isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
};

ProductTableHeader.defaultProps = {
  currentUserRoles: [],
  searchQuery: '',
};

export default ProductTableHeader;
