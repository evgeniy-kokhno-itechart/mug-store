import React, { Component } from "react";
import SearchBox from "../common/searchBox";
import SortBox from "./sortBox";
import ProductsTable from "./productsTable";

class ProductsContainer extends Component {
  state = {
    searchQuery: "",
    sortKey: ""
  };

  handleSearch = (e, query) => {
    console.log(e);
    e.preventDefault();
    console.log("searchQuery", query);
    this.setState({ searchQuery: query });
  };

  handleSort = key => {
    console.log(key);
  };

  render() {
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
        <ProductsTable />
        {/* <Pagination /> */}
      </React.Fragment>
    );
  }
}

export default ProductsContainer;
