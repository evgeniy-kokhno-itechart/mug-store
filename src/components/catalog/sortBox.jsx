import React, { Component } from "react";
import Dropdown from "../common/dropdown";

class SortBox extends Component {
  options = [
    { _id: "price_asc", name: "Price A-Z" },
    { _id: "price_desc", name: "Price Z-A" },
    { _id: "name_asc", name: "Name A-Z" },
    { _id: "name_desc", name: "Name Z-A" }
  ];

  // onChange = e => {
  //   console.log(e);
  //   console.log(e.currentTarget.value);
  // };

  render() {
    const { onChange } = this.props;
    return (
      <Dropdown
        name="sortDropdown"
        label="Sorted by:"
        options={this.options}
        isOnelineElement={true}
        defaultText="default"
        onChange={e => onChange(e.currentTarget.value)}
      />
    );
  }
}

export default SortBox;
