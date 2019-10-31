import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './ListGroupItem.scss';

class ListGroupItem extends Component {
  getClasses = (item, selectedItem) => (item.id === selectedItem.id ? 'group-list__item--active' : '');

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
        className={`group-list__item clickable ${this.getClasses(item, selectedItem)}`}
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
  selectedItem: {},
};

export default ListGroupItem;
