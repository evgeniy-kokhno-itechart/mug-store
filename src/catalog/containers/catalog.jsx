import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCategories } from '../../services/categoriesService';
import { getProducts } from '../../services/productsService';
import * as cartActionTypes from '../../cart/cartActions';
import paginate from '../../services/paginate';
import ListGroup from '../../shared/controls/listGroup';
import ProductsTable from './productsTable';
import ProductTableHeader from '../components/productsTableHeader';
import ProductsTableFooter from '../components/productsTableFooter';

class Catalog extends Component {
  state = {
    categories: [],
    products: [],
    currentCatergory: null,
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
    pageSize: 10,
    currentPage: 1,
  };

  pageSizeOptions = [
    { _id: '5', name: '5' },
    { _id: '10', name: '10' },
    { _id: '15', name: '15' },
  ];

  sortOptions = [
    { _id: 'price_asc', name: 'Price A-Z' },
    { _id: 'price_desc', name: 'Price Z-A' },
    { _id: 'title_asc', name: 'Title A-Z' },
    { _id: 'title_desc', name: 'Title Z-A' },
    { _id: 'rate_asc', name: 'Rate 1-5' },
    { _id: 'rate_desc', name: 'Rate 5-1' },
  ];

  componentDidMount() {
    const categoriesPopulated = [
      { _id: '', name: 'All Products' },
      ...getCategories(),
    ];
    const products = getProducts();
    this.setState({
      categories: categoriesPopulated,
      products,
    });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      products: allProducts,
      currentCatergory,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (currentCatergory && currentCatergory._id) {
      filtered = allProducts.filter(m => m.category._id === currentCatergory._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const productsOnPage = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, productsOnPage };
  };

  handleItemSelect = (category) => {
    this.setState({ currentCatergory: category, searchQuery: '', currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (e, query) => {
    e.preventDefault();
    this.setState({ searchQuery: query, currentCatergory: null, currentPage: 1 });
  };

  handleSort = (detailsToBeSplitted) => {
    if (detailsToBeSplitted) {
      const sortInfo = detailsToBeSplitted.split('_');
      if (sortInfo[0] === 'price') {
        sortInfo[0] = `${sortInfo[0]}.${this.props.currentCurrency.name}`;
      }

      this.setState({ sortColumn: { path: sortInfo[0], order: sortInfo[1] } });
    } else this.setState({ sortColumn: { path: 'title', order: 'asc' } });
  };

  handleItemsCountChange = (pageSizeString) => {
    const pageSize = +pageSizeString;
    this.setState({ pageSize, currentPage: 1 });
  };

  handleDelete = (productId) => {
    // const products = this.state.products.filter(p => p._id !== productId);
    this.setState(prevState => ({ products: prevState.products.filter(p => p._id !== productId) }));
  };

  renderEmptyMessage = () => (
    <h1 className="m-2 text-center">
          There are no products in the catalog
      <div className="m-1 m-md-3 mx-auto">
        <Link className="btn btn-secondary" to="/">
              To Main Page
        </Link>
      </div>
    </h1>
  )

  renderProducts = (totalCount, productsOnPage) => {
    const {
      categories,
      currentCatergory,
      sortColumn,
      searchQuery,
      pageSize,
      currentPage,
    } = this.state;

    const { currentUser } = this.props;

    return (
      <div className="row mt-3">
        <div className="col-11 col-sm-3 col-lg-2 mx-auto mb-2">
          <ListGroup items={categories} selectedItem={currentCatergory} onItemSelect={this.handleItemSelect} />
        </div>
        <div className="col-12 col-sm-9 col-lg-10">
          <ProductTableHeader
            currentUserRoles={currentUser.roles}
            earchQuery={searchQuery}
            sortOptions={this.sortOptions}
            handleSearch={this.handleSearch}
            handleSort={this.handleSort}
          />

          <ProductsTable
            sortColumn={sortColumn}
            productsOnPage={productsOnPage}
            onDelete={this.handleDelete}
          />

          <ProductsTableFooter
            totalCount={totalCount}
            pageSize={pageSize}
            pageSizeOptions={this.pageSizeOptions}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            onItemsCountChange={this.handleItemsCountChange}
          />
        </div>
      </div>
    );
  }

  render() {
    const { totalCount, productsOnPage } = this.getPagedData();
    return (
      productsOnPage.length
        ? this.renderProducts(totalCount, productsOnPage)
        : this.renderEmptyMessage()
    );
  }
}

Catalog.propTypes = {
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,
  currentUser: PropTypes.shape({ roles: PropTypes.array }).isRequired,
};

const mapStateToProps = state => ({
  cart: state.cartState.cart,
  currentUser: state.userState.currentUser,
  currentCurrency: state.currencyState.currentCurrency,
});

const mapDispatchToProps = dispatch => ({
  onBuyNow: (productId, quantity) => dispatch({ type: cartActionTypes.ADD_TO_CART, cart: { productId, quantity } }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog);
