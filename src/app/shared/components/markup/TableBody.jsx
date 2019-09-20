import React, { Component } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  createKey = (item, column) => item.id + (column.path || column.key);

  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            {columns.map(column => (
              <td
                key={this.createKey(item, column)}
                className={`p-1 p-md-2 ${column.customClasses}`}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
