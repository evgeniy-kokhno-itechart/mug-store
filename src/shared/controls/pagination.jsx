import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import '../../styles/Pagination.css';

class Pagination extends Component {
  getPages() {
    const { itemsCount, pageSize } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    return { pagesCount, pages };
  }

  renderPages(pages) {
    const { currentPage, onPageChange } = this.props;

    return (
      <nav>
        <ul className="pagination">
          {pages.map(p => (
            <li key={p} className={currentPage === p ? 'page-item active' : 'page-item '}>
              <button type="button" className="page-link clickable" onClick={() => onPageChange(p)}>
                {p}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  render() {
    const { pagesCount, pages } = this.getPages();

    return pagesCount === 1 ? null : this.renderPages(pages);
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
};

export default Pagination;
