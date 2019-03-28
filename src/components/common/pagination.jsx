import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Dropdown from "./dropdown";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;
  return (
    <div className="row justify-content-between">
      <nav>
        <ul className="pagination">
          {pages.map(p => (
            <li
              key={p}
              className={currentPage === p ? "page-item active" : "page-item "}
            >
              <a onClick={() => onPageChange(p)} className="page-link">
                {p}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
