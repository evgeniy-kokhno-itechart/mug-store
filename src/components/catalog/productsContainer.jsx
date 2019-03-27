import React, { Component } from "react";
import SearchBox from "../common/searchBox";
import SortBox from "./sortBox";
import ProductsTable from "./productsTable";

class ProductsContainer extends Component {
  state = {
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  handleSearch = (e, query) => {
    e.preventDefault();
    if (!query) {
      console.log("query is empty");
      return;
    }
    console.log(e);
    console.log("searchQuery", query);
    this.setState({ searchQuery: query });
  };

  handleSort = key => {
    console.log(key);
  };

  render() {
    const { sortColumn, productsOnPage } = this.state;

    return (
      <React.Fragment>
        <div className="row justify-content-between">
          <div className="col-sm-4">
            <SearchBox
              // value={searchQuery}
              onSubmit={this.handleSearch}
            />
          </div>
          <div className="justify-content-end">
            <SortBox onChange={this.handleSort} />
          </div>
        </div>
        <ProductsTable
          sortColumn={sortColumn}
          productsOnPage={productsOnPage}
        />
        {/* <Pagination /> */}
      </React.Fragment>
    );
  }
}

export default ProductsContainer;
