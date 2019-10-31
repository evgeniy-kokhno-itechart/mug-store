import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './SearchBox.scss';

class SearchBox extends PureComponent {
  state = { query: this.props.value };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    this.props.onSearchSubmit(e, this.state.query);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          className="search-form__input focusable"
          type="text"
          name="query"
          placeholder="Search..."
          value={this.state.query}
          onChange={this.handleChange}
        />

        <button type="submit" className="button button--outline focusable search-form__btn">
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
    );
  }
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onSearchSubmit: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  value: 'Search...',
};

export default SearchBox;
