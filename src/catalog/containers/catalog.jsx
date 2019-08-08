/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { changeCategory } from '../categories-redux-state/categoryActions';
import paginate from '../../services/catalog/paginate';
import ListGroup from '../../shared/controls/listGroup';
import CatalogTable from './catalogTable';
import CatalogTableHeader from '../components/catalogTableHeader';
import CatalogTableFooter from '../components/catalogTableFooter';
import Spinner from '../../shared/markup-usage/spinner';
import ErrorMessage from '../../shared/markup-usage/errorMessage';
import { deleteProduct, getProducts } from '../../product/productsActions';
import { productsPricesSelector } from '../../product/productsSelectors';

class Catalog extends Component {
  state = {
    searchQuery: '',
    sortColumn: { id: 'title_asc', path: 'title', order: 'asc' },
    pageSize: 10,
    currentPage: 1,
  };

  pageSizeOptions = [
    { id: '5', name: '5' },
    { id: '10', name: '10' },
    { id: '15', name: '15' },
  ];

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

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    const { currentCategory } = this.props;

    const allProducts = this.props.products;
    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (currentCategory && currentCategory.id) {
      filtered = allProducts.filter(m => m.category.id === currentCategory.id);
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
    } else this.setState({ sortColumn: { path: 'title', order: 'asc' } });
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
      sortColumn,
      searchQuery,
      pageSize,
      currentPage,
    } = this.state;

    const { currentUser, categories, currentCategory } = this.props;

    return (
      <div className="row mt-3">
        <div className="col-11 col-sm-3 col-lg-2 mx-auto mb-2">
          <ListGroup
            items={[this.allProductsCategory, ...categories]}
            selectedItem={currentCategory}
            onItemSelect={this.handleItemSelect}
          />
        </div>

        <div className="col-12 col-sm-9 col-lg-10">
          <CatalogTableHeader
            currentUserRoles={currentUser.roles}
            searchQuery={searchQuery}
            sortColumnKey={sortColumn.id}
            sortOptions={this.sortOptions}
            handleSearch={this.handleSearch}
            handleSort={this.handleSort}
          />

          <CatalogTable
            sortColumn={sortColumn}
            productsOnPage={productsOnPage}
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
  }

  render() {
    const { totalCount, productsOnPage } = this.getPagedData();
    const {
      isProductsLoading,
      hasProductsLoadingFailed,
      errorWhileProductsLoading,
      isCategoriesLoading,
      hasCategoriesLoadingFailed,
      errorWhileCategoriesLoading,
      isProductDeletingInProcess,
      hasProductDeletingFailed,
      errorWhileProductDeleting,
    } = this.props;
    return (
      (isProductsLoading || isCategoriesLoading || isProductDeletingInProcess)
        ? <Spinner sizeInRems='5' />
        : ((hasProductsLoadingFailed || hasCategoriesLoadingFailed || hasProductDeletingFailed)
          ? <ErrorMessage message={errorWhileProductsLoading || errorWhileCategoriesLoading || errorWhileProductDeleting} />
          : (productsOnPage.length
            ? this.renderProducts(totalCount, productsOnPage)
            : this.renderEmptyMessage()))
    );
  }
}

Catalog.propTypes = {
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,
  currentUser: PropTypes.shape({ roles: PropTypes.arrayOf(PropTypes.string) }).isRequired,

  isProductsLoading: PropTypes.bool,
  hasProductsLoadingFailed: PropTypes.bool,
  errorWhileProductsLoading: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    imageURL: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    basePrice: PropTypes.number,
    currentCurrencyCost: PropTypes.number,
    discount: PropTypes.number,
    producer: PropTypes.string,
    publishDate: PropTypes.string,
    rate: PropTypes.string,
  })),
  getProducts: PropTypes.func.isRequired,

  isProductDeletingInProcess: PropTypes.bool,
  hasProductDeletingFailed: PropTypes.bool,
  errorWhileProductDeleting: PropTypes.string,
  deleteProduct: PropTypes.func.isRequired,

  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  currentCategory: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  isCategoriesLoading: PropTypes.bool,
  hasCategoriesLoadingFailed: PropTypes.bool,
  errorWhileCategoriesLoading: PropTypes.string,
  changeCategory: PropTypes.func.isRequired,
};

Catalog.defaultProps = {
  products: [],
  isProductsLoading: true,
  hasProductsLoadingFailed: false,
  errorWhileProductsLoading: '',

  categories: [],
  currentCategory: null,
  isCategoriesLoading: true,
  hasCategoriesLoadingFailed: false,
  errorWhileCategoriesLoading: '',

  isProductDeletingInProcess: true,
  hasProductDeletingFailed: false,
  errorWhileProductDeleting: '',
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentCurrency: state.currency.currentCurrency,

  products: productsPricesSelector(state),
  isProductsLoading: state.products.tableProductsStatus.isGettingInProcess,
  hasProductsLoadingFailed: state.products.tableProductsStatus.hasGettingFailed,
  errorWhileProductsLoading: state.products.tableProductsStatus.error,

  currentCategory: state.category.currentCategory,
  categories: state.category.categories,
  isCategoriesLoading: state.category.categoriesStatus.isInProcess,
  hasCategoriesLoadingFailed: state.category.categoriesStatus.hasFailed,
  errorWhileCategoriesLoading: state.category.categoriesStatus.error,

  isProductDeletingInProcess: state.products.deletingStatus.isDeletingInProcess,
  hasProductDeletingFailed: state.products.deletingStatus.hasDeletingFailed,
  errorWhileProductDeleting: state.products.deletingStatus.error,
});

const mapDispatchToProps = {
  changeCategory,
  getProducts,
  deleteProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog);
