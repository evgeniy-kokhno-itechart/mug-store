/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CatalogDeleteAction from '../../app/catalog/components/CatalogDeleteAction';

configure({ adapter: new Adapter() });

describe('<CatalogDeleteAction />', () => {
  let CatalogDeleteActionWrapper;

  beforeEach(() => {
    const handleAction = jest.fn();
    CatalogDeleteActionWrapper = shallow(<CatalogDeleteAction productId="1" productTitle="testProduct" handleAction={handleAction} />);
  });

  it('check render properly', () => {
    expect(CatalogDeleteActionWrapper).toMatchSnapshot();
  });
});
