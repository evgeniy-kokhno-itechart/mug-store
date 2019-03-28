import React, { Component } from "react";
import Dropdown from "../common/dropdown";

class SortBox extends Component {
  // onChange = e => {
  //   console.log(e);
  //   console.log(e.currentTarget.value);
  // };

  render() {
    const { sortOptions, onChange } = this.props;
    return (
      <Dropdown
        name="sortDropdown"
        label="Sorted by:"
        options={sortOptions}
        isOnelineElement={true}
        defaultText="default"
        onChange={e => onChange(e.currentTarget.value)}
      />
    );
  }
}

export default SortBox;