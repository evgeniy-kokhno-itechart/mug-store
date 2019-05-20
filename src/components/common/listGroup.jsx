import React, { Component } from "react";

class ListGroup extends Component {
  state = {};

  getClasses = (item, selectedItem) => {
    return item === selectedItem ? " active" : "";
  };

  render() {
    const { items, selectedItem, onItemSelect } = this.props;
    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item._id}
            className={
              "list-group-item list-group-item-action list-group-item-secondary clickable p-2 p-sm-2 px-md-3 px-lg-4 text-center text-sm-left" +
              this.getClasses(item, selectedItem)
            }
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
