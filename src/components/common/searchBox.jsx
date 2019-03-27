import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBox extends Component {
  state = { data: { query: "" } };

  handleChange = e => {
    const clonedData = { ...this.state.data };
    clonedData[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data: clonedData });
  };

  render() {
    const { value, onSubmit } = this.props;
    return (
      <form
        className="form-inline"
        onSubmit={e => onSubmit(e, this.state.data.query)}
      >
        <input
          className="form-control mr-2"
          type="text"
          name="query"
          placeholder="Search..."
          value={this.state.data.query}
          onChange={this.handleChange}
          aria-label="Search"
        />
        <button className="btn btn-outline-secondary">
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
    );
  }
}

export default SearchBox;
