/* eslint-disable no-undef */
import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductForm } from '../../product/containers/ProductForm';

configure({ adapter: new Adapter() });

describe('<ProductForm />', () => {
  let ProductFormWrapper;
  let getProduct;
  let saveProduct;
  let clearCurrentProductInfo;

  beforeEach(() => {
    getProduct = jest.fn();
    saveProduct = jest.fn();
    clearCurrentProductInfo = jest.fn();

    ProductFormWrapper = mount(
      <ProductForm
        currentCurrency={{ id: '1', name: 'CURR1', rate: 0.56 }}
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
      isProductLoading: false,
      isSavingInProcess: false,
      product: {
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
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders empty form with match.params.id is set to new', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
      match: { params: { id: 'new' } },
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders Spinner when isProductLoading is true', () => {
    ProductFormWrapper.setProps({ isProductLoading: true, hasProductLoadingFailed: false, errorWhileProductLoading: '' });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders Spinner when isSavingInProcess is true', () => {
    ProductFormWrapper.setProps({ isSavingInProcess: true, hasSavingFailed: false, errorWhileProductSaving: '' });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders error message when hasProductLoadingFailed is true', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
      hasProductLoadingFailed: true,
      errorWhileProductLoading: 'test product loading error',
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders error message when hasSavingFailed is true', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
      hasSavingFailed: true,
      errorWhileProductSaving: 'test product saving error',
    });
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('rerenders with updated state on title input change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#title');
    input.simulate('change', { target: { name: 'title', value: 'test title' } });

    expect(ProductFormWrapper.state('data').title).toBe('test title');
  });

  it('rerenders with updated state on imageURL input change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#imageURL');
    input.simulate('change', { target: { name: 'imageURL', value: 'testimageURL' } });

    expect(ProductFormWrapper.state('data').imageURL).toBe('testimageURL');
  });

  it('rerenders with updated state on description text area change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#description');
    input.simulate('change', { target: { name: 'description', value: 'test description' } });

    expect(ProductFormWrapper.state('data').description).toBe('test description');
  });

  it('rerenders with updated state on categoryId dropdown change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#categoryId');
    input.simulate('change', { target: { name: 'categoryId', value: 'test adress' } });

    expect(ProductFormWrapper.state('data').categoryId).toBe('test adress');
  });

  it('rerenders with updated state on currentCurrencyPrice input change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#currentCurrencyPrice');
    input.simulate('change', { target: { name: 'currentCurrencyPrice', value: '100' } });

    expect(ProductFormWrapper.state('data').currentCurrencyPrice).toBe('100');
  });

  it('rerenders with updated state on discount input change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#discount');
    input.simulate('change', { target: { name: 'discount', value: '15' } });

    expect(ProductFormWrapper.state('data').discount).toBe('15');
  });

  it('rerenders with updated state on producer input change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#producer');
    input.simulate('change', { target: { name: 'producer', value: 'test producer' } });

    expect(ProductFormWrapper.state('data').producer).toBe('test producer');
  });

  it('rerenders with updated state on rate input change', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
    });
    const input = ProductFormWrapper.find('#rate');
    input.simulate('change', { target: { name: 'rate', value: '3' } });

    expect(ProductFormWrapper.state('data').rate).toBe('3');
  });

  it('submits form properly after the from has been filled out with new user info', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
      product: {
        imageURL: '#123456',
        title: 'Test Mug',
        description: 'product 1 description',
        category: { id: '1', name: 'category 1' },
        currentCurrencyPrice: 5,
        discount: 0,
        producer: 'test producer 1',
        rate: '5',
      },
    });
    const form = ProductFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(saveProduct).toHaveBeenCalled();
  });

  it('submits form properly after info in the from has been edited', () => {
    ProductFormWrapper.setProps({
      isProductLoading: false,
      isSavingInProcess: false,
      product: {
        id: '1',
        imageURL: '#123456',
        title: 'Test Mug',
        description: 'product 1 description',
        category: { id: '1', name: 'category 1' },
        currentCurrencyPrice: 5,
        discount: 0,
        producer: 'test producer 1',
        rate: '5',
      },
    });
    ProductFormWrapper.find('#title').simulate('change', { target: { name: 'title', value: 'title edited' } });

    const form = ProductFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(saveProduct).toHaveBeenCalled();
  });
});
