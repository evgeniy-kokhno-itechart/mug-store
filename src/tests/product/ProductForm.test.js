/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductForm from '../../app/product/components/ProductForm/ProductForm';

configure({ adapter: new Adapter() });

describe('<ProductForm />', () => {
  let ProductFormWrapper;
  let submitForm;

  beforeEach(() => {
    submitForm = jest.fn();
  });

  it('renders empty form with default props', () => {
    ProductFormWrapper = shallow(
      <ProductForm
        currentCurrencyName='CURR1'
        categories={[{ id: '1', name: 'category1' }, { id: '2', name: 'category2' }]}
        onSubmit={submitForm}
      />,
    );
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('renders not empty fields with product data provided', () => {
    ProductFormWrapper = shallow(
      <ProductForm
        currentCurrencyName='CURR1'
        categories={[{ id: '1', name: 'category1' }, { id: '2', name: 'category2' }]}
        onSubmit={submitForm}
        product={{
          id: '1',
          imageURL: '#',
          title: 'Mug 1',
          description: 'product 1 description',
          categoryId: '2',
          basePrice: 5,
          currentCurrencyPrice: 5,
          discount: 0,
          producer: 'test producer 1',
          publishDate: 'Tue Aug 20 2019 16:27:02 GMT+0300 (Moscow Standard Time)',
          rate: '5',
        }}
      />,
    );
    expect(ProductFormWrapper).toMatchSnapshot();
  });

  it('submits form properly after the from has been filled out', () => {
    ProductFormWrapper = shallow(
      <ProductForm
        currentCurrencyName='CURR1'
        categories={[{ id: '1', name: 'category1' }, { id: '2', name: 'category2' }]}
        onSubmit={submitForm}
      />,
    );
    ProductFormWrapper.setState({
      data: {
        imageURL: '#123456',
        title: 'Test Mug',
        description: 'product 1 description',
        categoryId: '1',
        currentCurrencyPrice: 5,
        discount: 0,
        producer: 'test producer 1',
        rate: '5',
      },
    });
    const form = ProductFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(submitForm).toHaveBeenCalled();
  });
});
