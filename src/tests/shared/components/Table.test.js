/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Table from '../../../app/shared/components/markup/Table/Table';

configure({ adapter: new Adapter() });

describe('<Table />', () => {
  let TableWrapper;

  beforeEach(() => {
    TableWrapper = shallow(
      <Table
        items={[
          { id: 1, name: 'one', description: 'first' },
          { id: 2, name: 'two', description: 'second' },
          { id: 3, name: 'three', description: 'third' },
        ]}
        columns={[
          { path: 'id', label: 'ID' },
          { path: 'name', label: 'Name' },
          { path: 'description', label: 'Description', content: item => <span>{`Test Content ${item.description}`}</span> },
        ]}
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(TableWrapper).toMatchSnapshot();
  });

  it('renders without header when headerExcluded is true', () => {
    TableWrapper.setProps({ headerExcluded: true });
    expect(TableWrapper).toMatchSnapshot();
  });

  it('renders within header when headerExcluded is false', () => {
    TableWrapper.setProps({ headerExcluded: false });
    expect(TableWrapper).toMatchSnapshot();
  });
});
