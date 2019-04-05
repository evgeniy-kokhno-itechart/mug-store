import React, { Component } from "react";
import _ from "lodash";
import { getCategories } from "../../services/categoriesService";
import { getProducts } from "./../../services/productsService";
import { paginate } from "./../../utils/paginate";
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import SortBox from "./sortBox";
import Pagination from "./../common/pagination";
import ProductsTable from "./productsTable";
import Dropdown from "./../common/dropdown";
import { getCurrentCurrency } from "../../services/payService";

class Catalog extends Component {
  state = {
    categories: [],
    products: [],
    currentCatergory: null,
    currentCurrency: {},
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

    return { totalCount: filtered.length, productsOnPage };
  };

  componentDidMount() {
    const categoriesPopulated = [
      { _id: "", name: "All Products" },
      ...getCategories()
    ];
    const products = getProducts();
    const currentCurrency = getCurrentCurrency();
    console.log("products", products);
    for (var i = 0; i < products.length; i++) {
      products[i].price[currentCurrency.name] = +products[i].price[
        currentCurrency.name
      ];
    }
    this.setState({
      categories: categoriesPopulated,
      products,
      currentCurrency
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
        sortInfo[0] = sortInfo[0] + "." + this.state.currentCurrency.name;
      this.setState({ sortColumn: { path: sortInfo[0], order: sortInfo[1] } });
    } else this.setState({ sortColumn: { path: "title", order: "asc" } });
  };

  handleItemsCountChange = pageSizeString => {
    const pageSize = +pageSizeString;
    this.setState({ pageSize });
  };

  handleBuyNow = (product, quantity) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    let id = product._id.toString();

    let existedProduct = cart.find(prod => prod._id === id);
    if (existedProduct)
      existedProduct.qty = existedProduct.qty + parseInt(quantity);
    else cart.push({ _id: id, qty: quantity });

    // let currentProduct = cart.find(prod => prod._id === id)
    //   ? cart.find(prod => prod._id === id)
    //   : { _id: id, qty: 0 };
    // currentProduct.qty = currentProduct.qty + parseInt(quantity);
    // cart.push(currentProduct);

    // cart[id] = cart[id] ? cart[id] : 0;
    // let qty = cart[id] + parseInt(quantity);
    // if (this.props.product.available_quantity < qty) {
    //   cart[id] = this.props.product.available_quantity;
    // } else {
    // cart[id] = qty;

    localStorage.setItem("cart", JSON.stringify(cart));
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

    const { totalCount, productsOnPage } = this.getPagedData();

    return (
      <div className="row mt-3">
        <div className="col col-lg-2">
          <ListGroup
            items={categories}
            selectedItem={currentCatergory}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col col-lg-10">
          <div className="row justify-content-between">
            <div className="col-sm-4">
              <SearchBox
                value={searchQuery}
                onSubmit={this.handleSearch}
                key={searchQuery}
              />
            </div>
            <div className="justify-content-end">
              <SortBox
                sortOptions={this.sortOptions}
                onChange={this.handleSort}
              />
            </div>
          </div>
          <ProductsTable
            sortColumn={sortColumn}
            productsOnPage={productsOnPage}
            onBuyNow={this.handleBuyNow}
          />
          <div className="row justify-content-between">
            <div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
                pageSizeOptions={this.pageSizeOptions}
                // onPageChange={this.handlePageChange}
                // onItemsCountChange={this.handleItemsCountChange}
              />
            </div>
            <div className="justify-content-end">
              <Dropdown
                name="itemsOnPage"
                label="Items on page"
                options={this.pageSizeOptions}
                value={pageSize}
                isOnelineElement={true}
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

export default Catalog;
