/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuyNowButton from '../../catalog/components/BuyNowButton';

configure({ adapter: new Adapter() });

describe('<BuyNowButton />', () => {
  let BuyNowButtonWrapper;

  beforeEach(() => {
    const onBuyNowFunc = jest.fn();
    BuyNowButtonWrapper = shallow(
      <BuyNowButton
        onBuyNow={onBuyNowFunc}
        product={{
          id: '',
          imageURL: '',
          title: 'Test Product',
          description: '',
          category: { id: '1', name: 'Test Category' },
          basePrice: 1,
          currentCurrencyPrice: 1,
          discount: 0,
          producer: '',
        }}
      />,
    );
  });

  it('check render without customClasses provided', () => {
    expect(BuyNowButtonWrapper.debug()).toMatchSnapshot();
  });

  it('check render with customClasses = testclass provided', () => {
    BuyNowButtonWrapper.setProps({ customClasses: 'testclass' });
    expect(BuyNowButtonWrapper.debug()).toMatchSnapshot();
  });
});
