import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

class TableHeader extends Component {
  raiseSort = path => {
    const newSortColumn = { ...this.props.sortColumn };
    if (newSortColumn.path === path)
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    this.props.onSort(newSortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path && column.path === sortColumn.path) {
      return sortColumn.order === "asc" ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );
    } else return;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              style={column.style}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {/* {this.renderSortIcon(column)} */}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
