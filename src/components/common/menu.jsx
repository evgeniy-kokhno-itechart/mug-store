import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = {};

  render() {
    const { items } = this.props;
    return (
      <nav className="nav flex-column">
        {items.map(item => (
          <Link
            key={item._id}
            className="nav-item"
            to={`/${item.title.toLowerCase()}`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    );
  }
}

export default Menu;
