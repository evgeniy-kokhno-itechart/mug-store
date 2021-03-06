import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { categoryActions } from '../../CategoryActions';
import CatalogTable from '../../components/CatalogTable/CatalogTable';
import CatalogTableHeader from '../../components/CatalogTableHeader/CatalogTableHeader';
import CatalogTableFooter from '../../components/CatalogTableFooter/CatalogTableFooter';
import {
  ListGroup, ErrorMessage, Spinner, paginate,
} from '../../../shared';
import { productsPricesSelector, productsActions } from '../../../product';
import { cartActions } from '../../../cart';
import './Catalog.scss';

export class Catalog extends Component {
  state = {
    searchQuery: '',
    sortColumn: { id: 'title_asc', path: 'title', order: 'asc' },
    pageSize: 10,
    currentPage: 1,
  };

  pageSizeOptions = [{ id: '5', name: '5' }, { id: '10', name: '10' }, { id: '15', name: '15' }];

  sortOptions = [
    { id: 'currentCurrencyPrice_asc', name: 'Price A-Z' },
    { id: 'currentCurrencyPrice_desc', name: 'Price Z-A' },
    { id: 'title_asc', name: 'Title A-Z' },
    { id: 'title_desc', name: 'Title Z-A' },
    { id: 'rate_asc', name: 'Rate 1-5' },
    { id: 'rate_desc', name: 'Rate 5-1' },
  ];

  allProductsCategory = { id: '', name: 'All Products' };

  componentDidMount() {
    this.props.getProducts();
  }

  isLoading() {
    const { products, category } = this.props;
    return (products.catalogProductsStatus.isInProcess || category.loadingStatus.isInProcess || products.productDeletingStatus.isInProcess);
  }

  hasError() {
    const { products, category } = this.props;
    return (products.catalogProductsStatus.hasFailed || category.loadingStatus.hasFailed || products.productDeletingStatus.hasFailed);
  }

  renderSpinner() {
    return <Spinner spinnerClasses="spinner--big" wrapperClasses="catalog-page__spinner" />;
  }

  renderErrorMessage() {
    const { products, category } = this.props;
    return <ErrorMessage message={products.catalogProductsStatus.error || category.loadingStatus.error || category.loadingStatus.error} />;
  }

  // eslint-disable-next-line react/sort-comp
  displayPagedDataOrEmpty = () => {
    const { totalCount, productsOnPage } = this.getPagedData();
    return productsOnPage.length
      ? this.renderProducts(totalCount, productsOnPage)
      : this.renderEmptyMessage();
  }

  getPagedData = () => {
    const {
      pageSize, currentPage, sortColumn, searchQuery,
    } = this.state;

    const { category } = this.props;

    const allProducts = this.props.products.productsForCatalog;
    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (category.currentCategory && category.currentCategory.id) {
      filtered = allProducts.filter(m => m.category.id === category.currentCategory.id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const productsOnPage = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, productsOnPage };
  };

  handleItemSelect = (category) => {
    this.setState({ searchQuery: '', currentPage: 1 });
    this.props.changeCategory(category);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (e, query) => {
    e.preventDefault();
    this.props.changeCategory(this.allProductsCategory);
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (e) => {
    const detailsToBeSplitted = e.currentTarget.value;
    if (detailsToBeSplitted) {
      const sortInfo = detailsToBeSplitted.split('_');

      this.setState({ sortColumn: { id: detailsToBeSplitted, path: sortInfo[0], order: sortInfo[1] } });
    } else {
      this.setState({ sortColumn: { path: 'title', order: 'asc' } });
    }
  };

  handleItemsCountChange = (e) => {
    const pageSizeString = e.currentTarget.value;
    const pageSize = +pageSizeString;
    this.setState({ pageSize, currentPage: 1 });
  };

  handleDelete = (productId) => {
    this.props.deleteProduct(productId);
    this.props.getProducts();
  };

  renderEmptyMessage = () => (
    <div className="empty-message">
      <h1 className="empty-message__header">
      There are no products in the catalog
      </h1>
      <div className="empty-message__redirect-button">
        <Link className="button button--solid" to="/">
          To Main Page
        </Link>
      </div>
    </div>
  );

  renderProducts = (totalCount, productsOnPage) => {
    const {
      sortColumn, searchQuery, pageSize, currentPage,
    } = this.state;

    const {
      currentUserRoles, category, isCurrencyLoading, addToCart,
    } = this.props;

    return (
      <div className="catalog-page">
        <div className="categories-list">
          <ListGroup
            items={[this.allProductsCategory, ...category.categories]}
            selectedItem={category.currentCategory}
            onItemSelect={this.handleItemSelect}
          />
        </div>

        <div className="catalog">
          <CatalogTableHeader
            currentUserRoles={currentUserRoles}
            searchQuery={searchQuery}
            sortColumnKey={sortColumn.id}
            sortOptions={this.sortOptions}
            handleSearch={this.handleSearch}
            handleSort={this.handleSort}
          />

          <CatalogTable
            sortColumn={sortColumn}
            productsOnPage={productsOnPage}
            currentUserRoles={currentUserRoles}
            isCurrencyLoading={isCurrencyLoading}
            addToCart={addToCart}
            onDelete={this.handleDelete}
          />

          <CatalogTableFooter
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
  };

  render() {
    return (
      // eslint-disable-next-line no-nested-ternary
      this.isLoading()
        ? this.renderSpinner()
        : this.hasError()
          ? this.renderErrorMessage()
          : this.displayPagedDataOrEmpty()
    );
  }
}

Catalog.propTypes = {
  currentUserRoles: PropTypes.arrayOf(PropTypes.string),

  products: PropTypes.shape({
    productsForCatalog: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        imageURL: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
        basePrice: PropTypes.number,
        currentCurrencyPrice: PropTypes.number,
        discount: PropTypes.number,
        producer: PropTypes.string,
        publishDate: PropTypes.string,
        rate: PropTypes.string,
      }),
    ),
    catalogProductsStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
    productDeletingStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
  }),

  category: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
    currentCategory: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    loadingStatus: PropTypes.shape({ isInProcess: PropTypes.bool, hasFailed: PropTypes.bool, error: PropTypes.string }),
  }),

  isCurrencyLoading: PropTypes.bool,

  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  changeCategory: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

Catalog.defaultProps = {
  currentUserRoles: [],

  products: {
    productsForCatalog: [],
    catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
    productDeletingStatus: { isInProcess: false, hasFailed: false, error: '' },
  },

  category: {
    categories: [],
    currentCategory: {},
    loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
  },

  isCurrencyLoading: true,
};

const mapStateToProps = state => ({
  currentUserRoles: state.user.currentUser.roles,

  products: {
    productsForCatalog: productsPricesSelector(state),
    catalogProductsStatus: state.products.catalogProductsStatus,
    productDeletingStatus: state.products.deletingStatus,
  },

  isCurrencyLoading: state.currency.currenciesStatus.isInProcess,

  category: state.category,
});

const mapDispatchToProps = {
  changeCategory: categoryActions.ChangeCategory,
  getProducts: productsActions.GetProducts.InitiateApiCall,
  deleteProduct: productsActions.DeleteProduct.InitiateApiCall,
  addToCart: cartActions.AddToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog);
