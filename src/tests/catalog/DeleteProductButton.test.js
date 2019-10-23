/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DeleteProductButton from '../../app/catalog/components/DeleteProductButton';

configure({ adapter: new Adapter() });

describe('<DeleteProductButton />', () => {
  let DeleteProductButtonWrapper;

  beforeEach(() => {
    const handleDelete = jest.fn();
    DeleteProductButtonWrapper = shallow(<DeleteProductButton productId="1" productTitle="testProduct" handleDelete={handleDelete} />);
  });

  it('check render properly', () => {
    expect(DeleteProductButtonWrapper).toMatchSnapshot();
  });
});
