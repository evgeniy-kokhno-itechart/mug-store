import React from 'react';
import { PropTypes } from 'prop-types';
import { DropdownInline, Pagination } from '../../../shared';
import './CatalogTableFooter.scss';

const CatalogTableFooter = ({
  totalCount, pageSize, pageSizeOptions, currentPage, onPageChange, onItemsCountChange,
}) => (
  <div className="catalog__footer">
    <Pagination
      itemsCount={totalCount}
      pageSize={pageSize}
      wrapperClasses="page-links"
      onPageChange={onPageChange}
      currentPage={currentPage}
      pageSizeOptions={pageSizeOptions}
    />
    <DropdownInline
      name="itemsOnPage"
      label="Items on page"
      options={pageSizeOptions}
      value={pageSize.toString()}
      wrapperClasses="page-size"
      selectClasses="page-size__dropdown"
      onChange={onItemsCountChange}
    />
  </div>
);

CatalogTableFooter.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsCountChange: PropTypes.func.isRequired,
};

export default CatalogTableFooter;
