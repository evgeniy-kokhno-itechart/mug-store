import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories } from "../../services/categoriesService";
import { getProducts } from "./../../services/productsService";
// import { getCurrentCurrency } from "../../services/payService";
// import { getCurrentUser } from "../../services/authService";
import { paginate } from "./../../utils/paginate";
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import SortBox from "./sortBox";
import Pagination from "./../common/pagination";
import ProductsTable from "./productsTable";
import Dropdown from "./../common/dropdown";
import * as actionTypes from "../store/actions";

class Catalog extends Component {
  state = {
    categories: [],
    products: [],
    currentCatergory: null,
    // currentCurrency: {},
    // currentUser: {},
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    pageSize: 10,
    currentPage: 1
  };

  pageSizeOptions = [
    { _id: "5", name: "5" },
    { _id: "10", name: "10" },
    { _id: "15", name: "15" }
  ];

  sortOptions = [
    { _id: "price_asc", name: "Price A-Z" },
    { _id: "price_desc", name: "Price Z-A" },
    { _id: "title_asc", name: "Title A-Z" },
    { _id: "title_desc", name: "Title Z-A" },
    { _id: "rate_asc", name: "Rate 1-5" },
    { _id: "rate_desc", name: "Rate 5-1" }
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
    // console.log("filtered", filtered);
    // console.log("search", searchQuery);
    if (searchQuery)
      filtered = allProducts.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (currentCatergory && currentCatergory._id)
      filtered = allProducts.filter(
        m => m.category._id === currentCatergory._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    console.log("path", sortColumn.path);
    console.log("order", sortColumn.order);
    const productsOnPage = paginate(sorted, currentPage, pageSize);
    console.log("productsOnPage", productsOnPage);
    return { totalCount: filtered.length, productsOnPage };
  };

  componentDidMount() {
    const categoriesPopulated = [
      { _id: "", name: "All Products" },
      ...getCategories()
    ];
    const products = getProducts();
    //const currentCurrency = this.props.currentCurrency;//getCurrentCurrency();
    // const currentUser = getCurrentUser();

    // console.log("products", products);
    // for (var i = 0; i < products.length; i++) {
    //   products[i].price[currentCurrency.name] = +products[i].price[
    //     currentCurrency.name
    //   ];
    // }
    this.setState({
      categories: categoriesPopulated,
      products
      // currentCurrency
      // currentUser
    });
  }

  handleItemSelect = category => {
    this.setState({
      currentCatergory: category,
      searchQuery: "",
      currentPage: 1
    });
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
    this.setState({
      searchQuery: query,
      currentCatergory: null,
      currentPage: 1
    });
  };

  handleSort = detailsToBeSplitted => {
    if (detailsToBeSplitted) {
      const sortInfo = detailsToBeSplitted.split("_");
      if (sortInfo[0] === "price")
        sortInfo[0] = sortInfo[0] + "." + this.props.currentCurrency.name;
      this.setState({ sortColumn: { path: sortInfo[0], order: sortInfo[1] } });
    } else this.setState({ sortColumn: { path: "title", order: "asc" } });
  };

  handleItemsCountChange = pageSizeString => {
    const pageSize = +pageSizeString;
    this.setState({ pageSize });
  };

  handleDelete = productId => {
    console.log("deleted", productId);
    // deleteProduct(productId);
    const products = this.state.products.filter(p => p._id !== productId);
    this.setState({ products });
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

    const { currentUser } = this.props;

    const { totalCount, productsOnPage } = this.getPagedData();
    if (productsOnPage.length === 0)
      return (
        <h2 className="m-2 text-center">
          There are no products in the catalog
        </h2>
      );
    return (
      <div className="row mt-3">
        <div className="col-11 col-sm-3 col-lg-2 mx-auto mb-2">
          <ListGroup
            items={categories}
            selectedItem={currentCatergory}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col col-sm-9 col-lg-10">
          <div className="row justify-content-between mx-1 mx-sm-2">
            <div className="col-12 col-md-5 col-lg-4 col-xl-3">
              {/*className="col-sm-4"> */}
              <SearchBox
                value={searchQuery}
                onSubmit={this.handleSearch}
                key={searchQuery}
              />
            </div>
            {currentUser.roles.includes("admin") && (
              <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                <Link
                  to="/edit/products/new"
                  className="btn btn-secondary mt-1 mt-md-0 w-100 px-md-2"
                >
                  Add New Product
                </Link>
              </div>
            )}
            <div className="col-12 col-md col-lg-3 col-xl-2">
              <SortBox
                sortOptions={this.sortOptions}
                onChange={this.handleSort}
              />
            </div>
          </div>

          <ProductsTable
            sortColumn={sortColumn}
            productsOnPage={productsOnPage}
            onBuyNow={this.props.onBuyNow}
            onDelete={this.handleDelete}
          />
          <div className="row justify-content-between mx-1 mx-sm-2">
            <div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
                pageSizeOptions={this.pageSizeOptions}
              />
            </div>
            <div className="mr-2">
              <Dropdown
                name="itemsOnPage"
                label="Items on page"
                options={this.pageSizeOptions}
                value={pageSize}
                isOnelineElement={true}
                customClasses="justify-content-end"
                onChange={e =>
                  this.handleItemsCountChange(e.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartState.cart,
    currentUser: state.userState.currentUser,
    currentCurrency: state.currencyState.currentCurrency
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBuyNow: (product, quantity) =>
      dispatch({ type: actionTypes.ADD_TO_CART, cart: { product, quantity } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
