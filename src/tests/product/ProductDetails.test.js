/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductDetails } from '../../app/product/containers/ProductDetails/ProductDetails';

configure({ adapter: new Adapter() });

describe('<ProductDetails />', () => {
  let ProductDetailsWrapper;
  const mockProduct = {
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

  const defaultProductState = {
    productState: {
      product: {
        id: '',
        imageURL: '',
        title: 'defaultProduct',
        description: '',
        category: {},
        basePrice: 0,
        currentCurrencyPrice: 0,
        discount: 0,
        producer: '',
        rate: '',
      },
      productStatus: {
        isInProcess: true,
        hasProductLoadingFailed: false,
        errorWhileLoading: '',
      },
    },
  };

  beforeEach(() => {
    const addToCart = jest.fn();
    const getProduct = jest.fn();
    const clearCurrentProductInfo = jest.fn();

    ProductDetailsWrapper = shallow(
      <ProductDetails
        match={{ params: { id: '100' } }}
        addToCart={addToCart}
        getProduct={getProduct}
        clearCurrentProductInfo={clearCurrentProductInfo}
      />,
    );
  });

  it('renders Spinner with default props', () => {
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });

  it('renders product details if productStatus.isInProcess = false', () => {
    ProductDetailsWrapper.setProps({
      productState: {
        product: mockProduct,
        productStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });

  it('renders ErrorMessage once productStatus.hasFailed and error provided', () => {
    ProductDetailsWrapper.setProps({
      productState: {
        productStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
      },
    });
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });

  it('render field info correctly with renderFieldInfo method', () => {
    ProductDetailsWrapper.setProps({
      productState: {
        product: mockProduct,
        productStatus: { isInProcess: false, hasFailed: false, error: '' },
      },
    });
    const informationItem = ProductDetailsWrapper.instance().renderFieldInfo({ label: 'Category', path: 'category.name' });
    expect(informationItem).toMatchSnapshot();
  });
});
