/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OrderTable from '../../app/order/components/OrderTable/OrderTable';

configure({ adapter: new Adapter() });

describe('<OrderTable />', () => {
  let OrderTableWrapper;

  beforeEach(() => {
    OrderTableWrapper = shallow(
      <OrderTable
        products={[
          {
            id: '1',
            imageURL: '#',
            title: 'test product 1',
            description: 'test product 1 description',
            currentCurrencyCost: 5,
            quantity: 3,
          },
          {
            id: '2',
            imageURL: '#',
            title: 'test product 2',
            description: 'test product 2 description',
            currentCurrencyCost: 10,
            quantity: 5,
          },
        ]}
        sortColumn="id"
        isCurrencyLoading
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(OrderTableWrapper).toMatchSnapshot();
  });
});
