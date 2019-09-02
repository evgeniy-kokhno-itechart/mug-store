/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductDetails } from '../../product/containers/ProductDetails';

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

  beforeEach(() => {
    const addToCart = jest.fn();
    const getProduct = jest.fn();
    const clearCurrentProductInfo = jest.fn();
    ProductDetailsWrapper = shallow(
      <ProductDetails
        isProductLoading
        match={{ params: { id: '100' } }}
        addToCart={addToCart}
        getProduct={getProduct}
        clearCurrentProductInfo={clearCurrentProductInfo}
      />,
    );
  });

  it('renders Spinner properly with default props', () => {
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });

  it('renders product details once isProductLoading is succesfully done', () => {
    ProductDetailsWrapper.setProps({
      isProductLoading: false,
      hasProductLoadingFailed: false,
      errorWhileLoading: '',
      product: mockProduct,
    });
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });

  it('renders ErrorMessage once hasProductLoadingFailed and errorWhileLoading provided', () => {
    ProductDetailsWrapper.setProps({ isProductLoading: false, hasProductLoadingFailed: true, errorWhileLoading: 'test error' });
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });

  it('render field info correctly with renderFieldInfo method', () => {
    ProductDetailsWrapper.setProps({
      product: mockProduct,
      isProductLoading: false,
      hasProductLoadingFailed: false,
      errorWhileLoading: '',
    });
    ProductDetailsWrapper.instance().renderFieldInfo({ label: 'Category', path: 'category.name' });
    expect(ProductDetailsWrapper).toMatchSnapshot();
  });
});
