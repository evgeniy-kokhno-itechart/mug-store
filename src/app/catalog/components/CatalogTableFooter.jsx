import React from 'react';
import { PropTypes } from 'prop-types';
import { DropdownInline, Pagination } from '../../shared';

const CatalogTableFooter = ({
  totalCount, pageSize, pageSizeOptions, currentPage, onPageChange, onItemsCountChange,
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
      <DropdownInline
        name="itemsOnPage"
        label="Items on page"
        options={pageSizeOptions}
        value={pageSize.toString()}
        wrapperClasses="justify-content-end"
        selectClasses="form-control"
        onChange={onItemsCountChange}
      />
    </div>
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