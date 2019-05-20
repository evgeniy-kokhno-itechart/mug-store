import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  const { columns, sortColumn, items, headerExcluded } = props;
  return (
    <div className="table-responsive-md">
      <table className="table">
        {!headerExcluded && (
          <TableHeader columns={columns} sortColumn={sortColumn} />
        )}
        <TableBody items={items} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
