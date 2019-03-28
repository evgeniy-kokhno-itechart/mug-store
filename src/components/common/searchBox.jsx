import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBox extends PureComponent {
  state = { query: this.props.value };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <form
        className="form-inline"
        onSubmit={e => onSubmit(e, this.state.query)}
      >
        <input
          className="form-control mr-2"
          type="text"
          name="query"
          placeholder="Search..."
          value={this.state.query}
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
