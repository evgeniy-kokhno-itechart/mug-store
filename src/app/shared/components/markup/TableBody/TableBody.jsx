import React, { Component } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import './TableBody.scss';

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
      <tbody className="infotable__body">
        {items.map(item => (
          <tr className="body-row" key={item.id}>
            {columns.map(column => (
              <td
                key={this.createKey(item, column)}
                className={`body-row__cell ${column.customClasses || ''}`}
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
