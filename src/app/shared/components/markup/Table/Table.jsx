import React from 'react';
import { PropTypes } from 'prop-types';
import TableHeader from '../TableHeader/TableHeader';
import TableBody from '../TableBody/TableBody';
import './Table.scss';

const Table = ({
  columns, items, children, customClasses,
}) => (
  <table className={`info-table ${customClasses}`}>
    <TableHeader columns={columns} />
    <TableBody items={items} columns={columns} />
    {children}
  </table>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  customClasses: PropTypes.string,
};

Table.defaultProps = {
  customClasses: '',
  children: null,
};

export default Table;
