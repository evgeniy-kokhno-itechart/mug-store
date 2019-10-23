import React from 'react';
import { PropTypes } from 'prop-types';
import './TableHeader.scss';

const TableHeader = ({ columns }) => (
  <thead className="info-table__header">
    <tr className="header-row">
      {columns.map(column => (
        <th
          key={column.path || column.key}
          className={`header-row__cell ${column.customClasses ? column.customClasses : ''}`}
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
