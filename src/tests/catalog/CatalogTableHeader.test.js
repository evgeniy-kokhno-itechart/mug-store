/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CatalogTableHeader from '../../app/catalog/components/CatalogTableHeader';

configure({ adapter: new Adapter() });

describe('<CatalogTableHeader />', () => {
  let CatalogTableHeaderWrapper;

  beforeEach(() => {
    const handleSearch = jest.fn();
    const handleSort = jest.fn();
    CatalogTableHeaderWrapper = shallow(
      <CatalogTableHeader
        sortColumnKey="title"
        sortOptions={[{ id: 'title_desc', name: 'Title Z-A' }]}
        handleSearch={handleSearch}
        handleSort={handleSort}
      />,
    );
  });

  it('check render properly', () => {
    expect(CatalogTableHeaderWrapper).toMatchSnapshot();
  });

  it('render AddNewProduct button with currentUserRole admin provided', () => {
    CatalogTableHeaderWrapper.setProps({ currentUserRoles: ['admin'] });
    expect(CatalogTableHeaderWrapper).toMatchSnapshot();
  });

  it('check render with searchQuery provided', () => {
    CatalogTableHeaderWrapper.setProps({ searchQuery: 'test query' });
    expect(CatalogTableHeaderWrapper).toMatchSnapshot();
  });
});
