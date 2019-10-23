/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import CatalogTable from '../../app/catalog/components/CatalogTable/CatalogTable';

configure({ adapter: new Adapter() });

const fakeProductsOnPage = [
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

describe('<CatalogTable />', () => {
  let CatalogTableWrapper;
  let addToCart;
  let onDelete;

  beforeEach(() => {
    addToCart = jest.fn();
    onDelete = jest.fn();
  });

  it('renders with default props', () => {
    CatalogTableWrapper = shallow(<CatalogTable productsOnPage={fakeProductsOnPage} addToCart={addToCart} onDelete={onDelete} />);
    expect(CatalogTableWrapper).toMatchSnapshot();
  });

  it('renders admin columns with user.roles contains admin', () => {
    CatalogTableWrapper = shallow(
      <CatalogTable
        productsOnPage={fakeProductsOnPage}
        addToCart={addToCart}
        onDelete={onDelete}
        currentUser={{ name: 'testuser', roles: ['admin'] }}
      />,
    );
    expect(CatalogTableWrapper).toMatchSnapshot();
  });

  it('passes isCurrencyLoading to ProductPrice component once provided', () => {
    CatalogTableWrapper = shallow(
      // BrowserRouter was added to get more details on CatalogTable rendering and capture isCurrencyLoading={false} supplied to Table
      <BrowserRouter>
        <CatalogTable productsOnPage={fakeProductsOnPage} addToCart={addToCart} onDelete={onDelete} isCurrencyLoading={false} />
        );
      </BrowserRouter>,
    );

    expect(CatalogTableWrapper).toMatchSnapshot();
  });
});
