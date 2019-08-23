/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginLogoutBar } from '../../general/containers/LoginLogoutBar';

configure({ adapter: new Adapter() });

describe('<LoginLogoutBar />', () => {
  let LoginLogoutBarWrapper;

  beforeEach(() => {
    const logoutFunc = jest.fn();
    LoginLogoutBarWrapper = shallow(<LoginLogoutBar logoutUser={logoutFunc} />);
  });

  it('check the shapshot without currentUserName provided', () => {
    expect(LoginLogoutBarWrapper.debug()).toMatchSnapshot();
  });

  it('check the shapshot with currentUserName===testUsername provided', () => {
    LoginLogoutBarWrapper.setProps({ currentUserName: 'testUsername' });
    expect(LoginLogoutBarWrapper.debug()).toMatchSnapshot();
  });
});
