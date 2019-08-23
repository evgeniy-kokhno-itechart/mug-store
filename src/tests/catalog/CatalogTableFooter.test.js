/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CatalogTableFooter from '../../catalog/components/CatalogTableFooter';

configure({ adapter: new Adapter() });

describe('<CatalogTableFooter />', () => {
  let CatalogTableFooterWrapper;

  beforeEach(() => {
    const onPageChange = jest.fn();
    const onItemsCountChange = jest.fn();
    CatalogTableFooterWrapper = shallow(
      <CatalogTableFooter
        totalCount={3}
        pageSize={10}
        pageSizeOptions={[{ id: '5', name: '5' }]}
        currentPage={1}
        onPageChange={onPageChange}
        onItemsCountChange={onItemsCountChange}
      />,
    );
  });

  it('check render properly', () => {
    expect(CatalogTableFooterWrapper.debug()).toMatchSnapshot();
  });
});
