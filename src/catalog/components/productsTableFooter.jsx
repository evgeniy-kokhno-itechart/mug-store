import React from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from '../../shared/controls/dropdown';
import Pagination from '../../shared/controls/pagination';

const ProductsTableFooter = ({
  totalCount,
  pageSize,
  pageSizeOptions,
  currentPage,
  onPageChange,
  onItemsCountChange,
}) => (
  <div className="row justify-content-between mx-0 mx-sm-2">
    <div className="col">
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
        currentPage={currentPage}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
    <div className="col">
      <Dropdown
        name="itemsOnPage"
        label="Items on page"
        options={pageSizeOptions}
        value={pageSize}
        isOnelineElement
        customClasses="justify-content-end"
        onChange={e => onItemsCountChange(e.currentTarget.value)}
      />
    </div>
  </div>
);

ProductsTableFooter.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string })).isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsCountChange: PropTypes.func.isRequired,
};

export default ProductsTableFooter;
