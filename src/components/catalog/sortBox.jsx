import React, { Component } from "react";
import Dropdown from "../common/dropdown";

class SortBox extends Component {
  render() {
    const { sortOptions, onChange } = this.props;
    return (
      <Dropdown
        name="sortDropdown"
        label="Sorted by:"
        options={sortOptions}
        isOnelineElement={true}
        defaultText="default"
        customClasses="justify-content-end mt-1 mt-lg-0"
        onChange={e => onChange(e.currentTarget.value)}
      />
    );
  }
}

export default SortBox;
