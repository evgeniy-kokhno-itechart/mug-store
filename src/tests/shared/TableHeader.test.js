/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableHeader from '../../shared/markup-usage/TableHeader';

configure({ adapter: new Adapter() });

describe('<TableHeader />', () => {
  let TableHeaderWrapper;

  beforeEach(() => {
    TableHeaderWrapper = shallow(
      <TableHeader
        columns={[
          { path: 'id', label: 'ID' },
          { path: 'name', label: 'Name' },
          { path: 'description', label: 'Description', content: item => <span>{`Test Content ${item.description}`}</span> },
        ]}
      />,
    );
  });

  it('renders properly', () => {
    expect(TableHeaderWrapper).toMatchSnapshot();
  });
});
