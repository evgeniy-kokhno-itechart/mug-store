/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginFormConnected } from '../../app/user/containers/LoginFormConnected';

configure({ adapter: new Adapter() });

describe('<LoginFormConnected />', () => {
  let LoginFormWrapper;
  let loginUserAction;

  beforeEach(() => {
    loginUserAction = jest.fn();
    LoginFormWrapper = shallow(<LoginFormConnected loginUserAction={loginUserAction} />);
  });

  it('renders properly with default props', () => {
    expect(LoginFormWrapper).toMatchSnapshot();
  });

  it('renders redirect on currentUserName provide', () => {
    LoginFormWrapper.setProps({ currentUserName: 'test username' });
    expect(LoginFormWrapper).toMatchSnapshot();
  });

  it('calls loginUserAction with redirectPath null on submit', () => {
    const loginData = { username: 'testuser', password: 'testpass' };
    LoginFormWrapper.instance().handleSubmit(loginData.username, loginData.password);

    expect(loginUserAction).toHaveBeenCalledWith({ ...loginData, redirectPath: null });
  });

  it('renders properly with location.fromPath provided', () => {
    const loginData = { username: 'testuser', password: 'testpass' };
    const redirectPath = 'testpath';
    LoginFormWrapper.setProps({ location: { fromPath: { pathname: redirectPath } } });
    LoginFormWrapper.instance().handleSubmit(loginData.username, loginData.password);

    expect(loginUserAction).toHaveBeenCalledWith({ ...loginData, redirectPath });
  });
});
