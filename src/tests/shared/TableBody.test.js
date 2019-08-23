/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableBody from '../../shared/markup-usage/TableBody';

configure({ adapter: new Adapter() });

describe('<TableBody />', () => {
  let TableBodyWrapper;

  beforeEach(() => {
    TableBodyWrapper = shallow(
      <TableBody
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

  it('renders properly', () => {
    expect(TableBodyWrapper).toMatchSnapshot();
  });
});
