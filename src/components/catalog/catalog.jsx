import React, { Component } from "react";
import { getCategories } from "../../services/categoriesService";
import { getProducts } from "./../../services/productsService";
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import SortBox from "./sortBox";
import Pagination from "./../common/pagination";
import ProductsTable from "./productsTable";
import _ from "lodash";

class Catalog extends Component {
  state = {
    categories: [],
    products: [],
    currentCatergory: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4,
    currentPage: 1
  };

  pageSizeOptions = [
    { _id: "5", name: "5" },
    { _id: "10", name: "10" },
    { _id: "15", name: "15" }
  ];

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      products: allProducts,
      currentCatergory,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentCatergory && currentCatergory._id)
      filtered = allProducts.filter(
        m => m.category._id === currentCatergory._id
      );

    const productsOnPage = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    //const productsOnPage = paginate(sorted, currentPage, pageSize);

    return { productsOnPage };
  };

  componentDidMount() {
    const categoriesPopulated = [
      { _id: "", title: "All Products" },
      ...getCategories()
    ];
    const products = getProducts();
    this.setState({
      categories: categoriesPopulated,
      products
    });
  }

  onItemSelect = item => {
    this.setState({ currentCatergory: item });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleItemsOnPageCountChange = pageSize => {
    this.setState({ pageSize });
  };

  handleSearch = (e, query) => {
    console.log(e);
    e.preventDefault();
    console.log("searchQuery", query);
    this.setState({ searchQuery: query });
  };

  handleSort = detailsToBeSplitted => {
    if (detailsToBeSplitted) {
      const sortInfo = detailsToBeSplitted.split("_");
      this.setState({ sortColumn: { path: sortInfo[0], order: sortInfo[1] } });
    } else this.setState({ sortColumn: { path: "title", order: "asc" } });
  };

  render() {
    const {
      categories,
      currentCatergory,
      sortColumn,
      searchQuery,
      pageSize,
      currentPage
    } = this.state;

    const { length: count } = this.state.products;
    const { productsOnPage } = this.getPagedData();

    return (
      <div className="row mt-3">
        <div className="col col-lg-2">
          <ListGroup
            items={categories}
            selectedItem={currentCatergory}
            onItemSelect={this.onItemSelect}
          />
        </div>

        <div className="col col-lg-10">
          <div className="row justify-content-between">
            <div className="col-sm-4">
              <SearchBox value={searchQuery} onSubmit={this.handleSearch} />
            </div>
            <div className="justify-content-end">
              <SortBox onChange={this.handleSort} />
            </div>
          </div>
          <ProductsTable
            sortColumn={sortColumn}
            productsOnPage={productsOnPage}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
            itemsCountOptions={this.pageSizeOptions}
            onPageChange={this.handlePageChange}
            onItemsCountChange={this.onItemsCountChange}
          />
        </div>
      </div>
    );
  }
}

export default Catalog;
