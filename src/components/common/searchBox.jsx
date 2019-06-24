import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

class SearchBox extends PureComponent {
  state = { query: this.props.value };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <form className="input-group" onSubmit={e => onSubmit(e, this.state.query)}>
        <input
          className="form-control"
          type="text"
          name="query"
          placeholder="Search..."
          value={this.state.query}
          onChange={this.handleChange}
          aria-label="Search"
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-outline-secondary">
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
      </form>
    );
  }
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  value: 'Search...',
};

export default SearchBox;
