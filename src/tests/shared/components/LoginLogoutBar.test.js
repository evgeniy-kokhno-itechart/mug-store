/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginLogoutBar from '../../../app/shared/components/markup/LoginLogoutBar';


configure({ adapter: new Adapter() });

describe('<LoginLogoutBar />', () => {
  let LoginLogoutBarWrapper;

  beforeEach(() => {
    const logoutFunc = jest.fn();
    LoginLogoutBarWrapper = shallow(<LoginLogoutBar logoutUser={logoutFunc} />);
  });

  it('renders Login and Register buttons without currentUserName provided', () => {
    expect(LoginLogoutBarWrapper).toMatchSnapshot();
  });

  it('renders user name and Profile button with currentUserName===testUsername provided', () => {
    LoginLogoutBarWrapper.setProps({ currentUserName: 'testUsername' });
    expect(LoginLogoutBarWrapper).toMatchSnapshot();
  });
});
