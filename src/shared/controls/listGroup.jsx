import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class ListGroup extends Component {
  getClasses = (item, selectedItem) => (item === selectedItem ? 'active' : '');

  render() {
    const { items, selectedItem, onItemSelect } = this.props;
    return (
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item.id}
            role="menuitem"
            tabIndex={index + 1} // 1 is added to avoid 0 in tabindex and prevent splitted iteration over the
            className={`list-group-item list-group-item-action list-group-item-secondary clickable p-2 p-sm-2 px-md-3 px-lg-4 text-center text-sm-left ${this.getClasses(
              item,
              selectedItem,
            )}`}
            onClick={() => onItemSelect(item)}
            onKeyUp={() => onItemSelect(item)} // to fulfill eslint-plugin-jsx-a11y/click-events-have-key-events rule
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  selectedItem: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  onItemSelect: PropTypes.func.isRequired,
};

ListGroup.defaultProps = {
  items: [{ id: '', name: '' }],
  selectedItem: null,
};

export default ListGroup;
