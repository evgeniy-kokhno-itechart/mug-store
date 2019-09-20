import React from 'react';
import { PropTypes } from 'prop-types';

const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      {columns.map(column => (
        <th
          key={column.path || column.key}
          className={`p-1 p-md-2 p-lg-3 ${column.customClasses ? column.customClasses : ''}`}
        >
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHeader;
