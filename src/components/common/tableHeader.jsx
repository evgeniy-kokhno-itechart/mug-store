import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            style={column.style}
            key={column.path || column.key}
            className={`p-1 p-md-2 p-lg-3 ${
              column.customClasses ? column.customClasses : ""
            }`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
