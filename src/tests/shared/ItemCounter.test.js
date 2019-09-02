/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ItemCounter from '../../shared/controls/ItemCounter';

configure({ adapter: new Adapter() });

describe('<ItemCounter />', () => {
  let ItemCounterWrapper;

  beforeEach(() => {
    const onIncrementClick = jest.fn();
    const onDecrementClick = jest.fn();
    const onCountChange = jest.fn();
    ItemCounterWrapper = shallow(
      <ItemCounter
        count={1}
        itemId="1"
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
        onCountChange={onCountChange}
      />,
    );
  });

  it('renders with decrement button disabled if count=1', () => {
    expect(ItemCounterWrapper).toMatchSnapshot();
  });

  it('renders with decrement button enabled if count is 2 (i.e. greater than 1)', () => {
    ItemCounterWrapper.setProps({ count: 2 });
    expect(ItemCounterWrapper).toMatchSnapshot();
  });
});
