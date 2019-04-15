import React, { Component } from "react";

class ListGroup extends Component {
  state = {};

  getClasses = (item, selectedItem) => {
    return item === selectedItem
      ? "list-group-item list-group-item-action list-group-item-secondary active clickable"
      : "list-group-item list-group-item-action list-group-item-secondary clickable";
  };

  render() {
    const { items, selectedItem, onItemSelect } = this.props;
    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item._id}
            className={this.getClasses(item, selectedItem)}
            onClick={() => onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
