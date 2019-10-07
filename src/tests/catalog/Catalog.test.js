/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Catalog } from '../../app/catalog/containers/Catalog';

configure({ adapter: new Adapter() });

const fakeProducts = [
  {
    id: '1',
    imageURL: '#',
    title: 'Mug 1',
    description: 'product 1 description',
    category: { id: '1', name: 'category 1' },
    basePrice: 5,
    currentCurrencyPrice: 5,
    discount: 0,
    producer: 'test producer 1',
    publishDate: 'Tue Aug 20 2019 16:27:02 GMT+0300 (Moscow Standard Time)',
    rate: '5',
  },
  {
    id: '2',
    imageURL: '#',
    title: 'Mug 2',
    description: 'product 2 description',
    category: { id: '2', name: 'category 2' },
    basePrice: 10,
    currentCurrencyPrice: 10,
    discount: 0,
    producer: 'test producer 2',
    publishDate: 'Tue Aug 20 2019 16:27:02 GMT+0300 (Moscow Standard Time)',
    rate: '3',
  },
  {
    id: '3',
    imageURL: '#',
    title: 'Plate 3',
    description: 'product 3 description',
    category: { id: '2', name: 'category 2' },
    basePrice: 15,
    currentCurrencyPrice: 15,
    discount: 0,
    producer: 'test producer 3',
    publishDate: 'Tue Aug 20 2019 16:27:02 GMT+0300 (Moscow Standard Time)',
    rate: '2',
  },
];

const fakeCategories = [{ id: '1', name: 'category 1' }, { id: '2', name: 'category 2' }];

const sideTasksCompletedProps = {
  products: {
    productsForCatalog: fakeProducts,
    catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
    productDeletingStatus: { isInProcess: false, hasFailed: false, error: '' },
  },
  category: {
    categories: fakeCategories,
    currentCategory: {},
    loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
  },
};

describe('<Catalog />', () => {
  let CatalogWrapper;
  let getProducts;
  let deleteProduct;
  let changeCategory;
  let addToCart;

  beforeEach(() => {
    getProducts = jest.fn();
    deleteProduct = jest.fn();
    changeCategory = jest.fn();
    addToCart = jest.fn();

    CatalogWrapper = shallow(
      <Catalog
        getProducts={getProducts}
        deleteProduct={deleteProduct}
        changeCategory={changeCategory}
        addToCart={addToCart}
      />,
    );
  });

  it('renders with default props', () => {
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders Spinner when catalogProductsStatus.isInProcess is true', () => {
    CatalogWrapper.setProps({
      products: {
        catalogProductsStatus: { isInProcess: true, hasFailed: false, error: '' },
        productDeletingStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders Spinner when productDeletingStatus.isInProcess is true', () => {
    CatalogWrapper.setProps({
      products: {
        catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
        productDeletingStatus: { isInProcess: true, hasFailed: false, error: '' },
      },
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders Spinner when category.loadingStatus.isInProcess is true', () => {
    CatalogWrapper.setProps({
      category: {
        loadingStatus: { isInProcess: true, hasFailed: false, error: '' },
      },
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it("renders ErrorMessage 'test error products loading' when catalogProductsStatus.hasFailed is true", () => {
    CatalogWrapper.setProps({
      products: {
        catalogProductsStatus: { isInProcess: false, hasFailed: true, error: 'test error products loading' },
        productDeletingStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it("renders ErrorMessage 'test error product deleting' when productDeletingStatus.hasFailed is true", () => {
    CatalogWrapper.setProps({
      products: {
        catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
        productDeletingStatus: { isInProcess: false, hasFailed: true, error: 'test error product deleting' },
      },
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it("renders ErrorMessage 'test error categories loading' when category.loadingStatus.hasFailed is true", () => {
    CatalogWrapper.setProps({
      category: {
        loadingStatus: { isInProcess: false, hasFailed: true, error: 'test error categories loading' },
      },
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders catalog table and categories when their arrays both are not empty', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders Add New Product button with products, categories and currentUserRoles admin included', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
      currentUserRoles: ['admin'],
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  // sort options testing
  it('renders product table with default sorting option which is { path: title, order: asc } ', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders product table with sorting option { path: title, order: desc } ', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ sortColumn: { id: 'title_desc', path: 'title', order: 'desc' } });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders product table with sorting option { path: rate, order: asc } ', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ sortColumn: { id: 'rate_asc', path: 'rate', order: 'asc' } });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders product table with sorting option { path: rate, order: desc } ', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ sortColumn: { id: 'rate_desc', path: 'rate', order: 'desc' } });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders product table with sorting option { path: currentCurrencyPrice, order: asc } ', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ sortColumn: { id: 'currentCurrencyPrice_asc', path: 'currentCurrencyPrice', order: 'asc' } });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders product table with sorting option { path: currentCurrencyPrice, order: desc } ', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ sortColumn: { id: 'currentCurrencyPrice_desc', path: 'currentCurrencyPrice', order: 'desc' } });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  // page size and current page testing
  it('renders the very first product page of table with pageSize 2', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ pageSize: 2 });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  it('renders the 2nd page with pageSize 2 and currentPage 2', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ pageSize: 2, currentPage: 2 });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  // search testing
  it('renders products whose titles are contain Mug word', () => {
    CatalogWrapper.setProps({
      products: sideTasksCompletedProps.products,
      category: sideTasksCompletedProps.category,
    });
    CatalogWrapper.setState({ searchQuery: 'Mug' });
    expect(CatalogWrapper).toMatchSnapshot();
  });

  // methods tests
  it('changes state.pageSize on handleItemsCountChange call', () => {
    CatalogWrapper.instance().handleItemsCountChange({ currentTarget: { value: '2' } });
    expect(CatalogWrapper.state('pageSize')).toBe(2);
  });

  it('changes state.currentPage on handlePageChange call', () => {
    CatalogWrapper.instance().handlePageChange(3);
    expect(CatalogWrapper.state('currentPage')).toBe(3);
  });

  it('empties search query, set currentPage to 1 and calls changeCategory on handleItemSelect call', () => {
    CatalogWrapper.setState({ searchQuery: 'testQuery', currentPage: 3 });
    CatalogWrapper.instance().handleItemSelect({ id: '1', name: 'test category' });
    expect(CatalogWrapper.state('searchQuery')).toBe('');
    expect(CatalogWrapper.state('currentPage')).toBe(1);
    expect(changeCategory).toHaveBeenCalled();
  });

  it('changes state.searchQuery and sets currentPage to 1 on handleSearch call', () => {
    const mockEventPreventDefault = jest.fn();
    CatalogWrapper.instance().handleSearch({ preventDefault: mockEventPreventDefault }, 'test query');
    expect(mockEventPreventDefault).toHaveBeenCalled();
    expect(changeCategory).toHaveBeenCalled();
    expect(CatalogWrapper.state('searchQuery')).toBe('test query');
    expect(CatalogWrapper.state('currentPage')).toBe(1);
  });

  it('changes state.sortColumn: { path: title, order: asc } i.e. default on handleSort call with empty details in onChange event', () => {
    CatalogWrapper.instance().handleSort({ currentTarget: { value: '' } });
    expect(CatalogWrapper.state('sortColumn').path).toBe('title');
    expect(CatalogWrapper.state('sortColumn').order).toBe('asc');
  });

  it('changes state.sortColumn: { path: testcol, order: testordr } on handleSort call with testcol_testordr parameted propvided', () => {
    CatalogWrapper.instance().handleSort({ currentTarget: { value: 'testcol_testordr' } });
    expect(CatalogWrapper.state('sortColumn').path).toBe('testcol');
    expect(CatalogWrapper.state('sortColumn').order).toBe('testordr');
  });

  it('calls deleteProduct and getProducts on handleDelete call', () => {
    CatalogWrapper.instance().handleDelete('testId');
    expect(deleteProduct).toHaveBeenCalledWith('testId');
    expect(getProducts).toHaveBeenCalled();
  });
});
