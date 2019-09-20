import React from 'react';
import { PropTypes } from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = (props) => {
  const { columns, items, customClasses } = props;
  return (
    <div className="table-responsive-md">
      <table className={`table ${customClasses}`}>
        <TableHeader columns={columns} />
        <TableBody items={items} columns={columns} />
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  customClasses: PropTypes.string,
};

Table.defaultProps = {
  customClasses: '',
};

export default Table;
