import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    // console.log("column.path", column.path);
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    // console.log("item_id", item._id);
    // console.log("typeof(item_id)", typeof item._id);
    // console.log("column.path/key", column.path || column.key);
    // console.log("typeof(column.path/key)", typeof (column.path || column.key));
    return item._id + (column.path || column.key);
  };

  render() {
    const { items, columns } = this.props;
    // console.log("props", this.props);
    // return <h1>carttable</h1>;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
