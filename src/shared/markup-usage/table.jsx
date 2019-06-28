import React from 'react';
import { PropTypes } from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {
  const { columns, items, headerExcluded } = props;
  return (
    <div className="table-responsive-md">
      <table className="table">
        {!headerExcluded && <TableHeader columns={columns} />}
        <TableBody items={items} columns={columns} />
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerExcluded: PropTypes.bool,
};

Table.defaultProps = {
  headerExcluded: false,
};

export default Table;
