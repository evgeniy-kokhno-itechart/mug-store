/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ItemCounter from '../../../app/shared/components/controls/ItemCounter';

configure({ adapter: new Adapter() });

describe('<ItemCounter />', () => {
  let ItemCounterWrapper;
  let onQuantityChanged;
  const fakeItem = { id: '1', quantity: 1 };

  beforeEach(() => {
    onQuantityChanged = jest.fn();
    ItemCounterWrapper = shallow(
      <ItemCounter
        item={fakeItem}
        onQuantityChanged={onQuantityChanged}
      />,
    );
  });

  it('renders with decrement button disabled if count=1', () => {
    expect(ItemCounterWrapper).toMatchSnapshot();
  });

  it('renders with decrement button enabled if count is 2 (i.e. greater than 1)', () => {
    ItemCounterWrapper.setProps({ item: { id: '1', quantity: 2 } });
    expect(ItemCounterWrapper).toMatchSnapshot();
  });

  it('calls onQuantityChanged with increased by 1 value on increment button click', () => {
    ItemCounterWrapper.find('.input-group-append').simulate('click');
    expect(onQuantityChanged).toHaveBeenCalledWith({ id: '1', quantity: 2 });
  });

  it('calls onQuantityChanged with decreased by 1 value on decrement button click', () => {
    ItemCounterWrapper.setProps({ item: { id: '1', quantity: 3 } });
    ItemCounterWrapper.find('.input-group-prepend').simulate('click');
    expect(onQuantityChanged).toHaveBeenCalledWith({ id: '1', quantity: 2 });
  });

  it('calls onQuantityChanged with 15 on input changed with 15', () => {
    ItemCounterWrapper.find('input').simulate('change', { target: { name: '', value: '15' } });
    expect(onQuantityChanged).toHaveBeenCalledWith({ id: '1', quantity: 15 });
  });
});
