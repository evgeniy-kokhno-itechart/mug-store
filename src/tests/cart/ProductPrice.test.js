/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductPrice from '../../cart/components/ProductPrice';

configure({ adapter: new Adapter() });

describe('<ProductPrice />', () => {
  let ProductPriceWrapper;

  beforeEach(() => {
    ProductPriceWrapper = shallow(<ProductPrice price={100} />);
  });

  it('check render without isCurrencyLoading provided', () => {
    expect(ProductPriceWrapper).toMatchSnapshot();
  });

  it('check render with isCurrencyLoading = true provided', () => {
    ProductPriceWrapper.setProps({ isCurrencyLoading: true });
    expect(ProductPriceWrapper).toMatchSnapshot();
  });
});
