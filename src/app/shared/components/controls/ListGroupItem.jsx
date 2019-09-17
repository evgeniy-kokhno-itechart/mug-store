import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class ListGroupItem extends Component {
  getClasses = (item, selectedItem) => (item.id === selectedItem.id ? 'active' : '');

  handleSelect = () => {
    const { item, handleItemSelect } = this.props;
    handleItemSelect(item);
  };

  render() {
    const { item, index, selectedItem } = this.props;
    return (
      <li
        key={item.id}
        role="menuitem"
        tabIndex={index + 1} // 1 is added to avoid 0 in tabindex and prevent inconsistent iteration
        className={`list-group-item list-group-item-action list-group-item-secondary clickable p-2 p-sm-2 px-md-3 px-lg-4 text-center text-sm-left ${this.getClasses(
          item,
          selectedItem,
        )}`}
        onClick={this.handleSelect}
        onKeyUp={this.handleSelect}
      >
        {item.name}
      </li>
    );
  }
}

ListGroupItem.propTypes = {
  item: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  index: PropTypes.number.isRequired,
  selectedItem: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  handleItemSelect: PropTypes.func.isRequired,
};

ListGroupItem.defaultProps = {
  selectedItem: null,
};

export default ListGroupItem;
