/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { createSerializer } from 'enzyme-to-json';

import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../shared/markup-usage/ProtectedRoute';
import Spinner from '../../shared/markup-usage/Spinner';

// expect.addSnapshotSerializer(createSerializer());
configure({ adapter: new Adapter() });

describe('<ProtectedRoute />', () => {
  let ProtectedRouteWrapper;

  it('renders LoginPage with default props', () => {
    ProtectedRouteWrapper = shallow(
      <BrowserRouter>
        <ProtectedRoute path="/about" />
      </BrowserRouter>,
    );
    expect(ProtectedRouteWrapper).toMatchSnapshot();
  });

  it('renders LoginPage with location = testlocation prop', () => {
    ProtectedRouteWrapper = shallow(
      <BrowserRouter>
        <ProtectedRoute path="/about" location={{ pathname: 'testlocation' }} />
      </BrowserRouter>,
    );
    expect(ProtectedRouteWrapper).toMatchSnapshot();
  });

  it('renders properly with mock Component provided', () => {
    jest.mock('../../shared/markup-usage/Spinner', () => <span>Mock Component</span>);
    ProtectedRouteWrapper = shallow(
      <BrowserRouter>
        <ProtectedRoute path="/about" currentUserName="Test User Name" component={<Spinner />} />
      </BrowserRouter>,
    );
    expect(ProtectedRouteWrapper).toMatchSnapshot();
  });

  it('renders properly with the render function provided', () => {
    const mockRender = jest.fn();
    ProtectedRouteWrapper = shallow(
      <BrowserRouter>
        <ProtectedRoute path="/about" render={mockRender} />
      </BrowserRouter>,
    );
    expect(ProtectedRouteWrapper).toMatchSnapshot();
  });
});