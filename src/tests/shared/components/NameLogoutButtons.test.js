/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NameLogoutButtons from '../../../app/shared/components/markup/NameLogoutButtons/NameLogoutButtons';

configure({ adapter: new Adapter() });

describe('<NameLogoutButtons />', () => {
  let NameLogoutButtonsWrapper;

  beforeEach(() => {
    const logoutUser = jest.fn();
    NameLogoutButtonsWrapper = shallow(<NameLogoutButtons currentUserName='test name' logoutUser={logoutUser} />);
  });

  it('renders properly with default props', () => {
    expect(NameLogoutButtonsWrapper).toMatchSnapshot();
  });
});
