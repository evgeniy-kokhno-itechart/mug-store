/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuyNowButton from '../../app/catalog/components/BuyNowButton';

configure({ adapter: new Adapter() });

describe('<BuyNowButton />', () => {
  let BuyNowButtonWrapper;
  const onBuyNowFunc = jest.fn();
  const product = {
    id: '',
    imageURL: '',
    title: 'Test Product',
    description: '',
    category: { id: '1', name: 'Test Category' },
    basePrice: 1,
    currentCurrencyPrice: 1,
    discount: 0,
    producer: '',
  };

  beforeEach(() => {
    BuyNowButtonWrapper = shallow(<BuyNowButton onBuyNow={onBuyNowFunc} product={product} />);
  });

  it('renders without customClasses provided', () => {
    expect(BuyNowButtonWrapper).toMatchSnapshot();
  });

  it('renders with customClasses = testclass provided', () => {
    BuyNowButtonWrapper.setProps({ customClasses: 'testclass' });
    expect(BuyNowButtonWrapper).toMatchSnapshot();
  });

  it('passes correct parameter on button clicked', () => {
    BuyNowButtonWrapper.find('button').simulate('click');
    expect(onBuyNowFunc).toHaveBeenCalled();
    expect(onBuyNowFunc).toHaveBeenCalledWith(product);
  });
});
