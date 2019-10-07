/* eslint-disable no-undef */
import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductFormConnected } from '../../app/product/containers/ProductFormConnected';

configure({ adapter: new Adapter() });

describe('<ProductFormConnected />', () => {
  let ProductFormWrapper;
  let getProduct;
  let saveProduct;
  let clearCurrentProductInfo;

  const fakeProduct = {
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
  };

  beforeEach(() => {
    getProduct = jest.fn();
    saveProduct = jest.fn();
    clearCurrentProductInfo = jest.fn();

    ProductFormWrapper = shallow(
      <ProductFormConnected
        currentCurrency={{ id: '1', name: 'CURR1', rate: 0.5 }}
        categories={[{ id: '1', name: 'category1' }, { id: '2', name: 'category2' }]}
        getProduct={getProduct}
        saveProduct={saveProduct}
        clearCurrentProductInfo={clearCurrentProductInfo}
      />,
    );
  });

  it('renders spinner with default props and calls getProduct', () => {
    expect(getProduct).toHaveBeenCalled();
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders properly with product data provided', () => {
    ProductFormWrapper.setProps({
      productState: {
        product: fakeProduct,
        loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
        savingStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('doesnt call getProduct with match.params.id is set to new', () => {
    mount(
      <ProductFormConnected
        currentCurrency={{ id: '1', name: 'CURR1', rate: 0.5 }}
        categories={[{ id: '1', name: 'category1' }, { id: '2', name: 'category2' }]}
        match={{ params: { id: 'new' } }}
        getProduct={getProduct}
        saveProduct={saveProduct}
        clearCurrentProductInfo={clearCurrentProductInfo}
      />,
    );
    expect(getProduct).toHaveBeenCalledTimes(1); // 1 means call getProduct on ProductForm mount defined in beforeEach
  });

  it('renders Spinner when loadingStatus.isInProcess is true', () => {
    ProductFormWrapper.setProps({
      productState: {
        loadingStatus: { isInProcess: true, hasFailed: false, error: '' },
        savingStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders Spinner when savingStatus.isInProcess is true', () => {
    ProductFormWrapper.setProps({
      productState: {
        loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
        savingStatus: { isInProcess: true, hasFailed: false, error: '' },
      },
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders error message when loadingStatus.hasFailed is true', () => {
    ProductFormWrapper.setProps({
      productState: {
        loadingStatus: { isInProcess: false, hasFailed: true, error: 'test product loading error' },
        savingStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders error message when savingStatus.hasFailed is true', () => {
    ProductFormWrapper.setProps({
      productState: {
        loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
        savingStatus: { isInProcess: false, hasFailed: true, error: 'test product saving error' },
      },
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('calls saveProduct method and passes mapped from view model product', () => {
    ProductFormWrapper.instance().handleSubmit({
      id: '',
      title: 'testTitle',
      imageURL: '###',
      description: 'test description',
      categoryId: '2',
      currentCurrencyPrice: 5,
      discount: 1,
      producer: 'test producer',
      rate: '3',
    });
    expect(saveProduct).toHaveBeenCalledWith({
      product: {
        id: '',
        title: 'testTitle',
        imageURL: '###',
        description: 'test description',
        category: { id: '2', name: 'category2' },
        basePrice: 10,
        discount: 1,
        producer: 'test producer',
        rate: '3',
      },
      redirectUrl: '/catalog',
    });
  });
});
