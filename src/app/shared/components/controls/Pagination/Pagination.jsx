import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PaginationButton from '../PaginationButton/PaginationButton';
import './Pagination.scss';

class Pagination extends Component {
  getPages() {
    const { itemsCount, pageSize } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    return { pagesCount, pages };
  }

  renderPages(pages) {
    const { currentPage, wrapperClasses } = this.props;

    return (
      <nav className={wrapperClasses}>
        <ul className="pagination-list">
          {pages.map(page => (
            <li key={page} className={currentPage === page ? 'pagination-item--active' : 'pagination-item'}>
              <PaginationButton page={page} handlePageChange={this.props.onPageChange} />
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
  wrapperClasses: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  wrapperClasses: '',
};

export default Pagination;
