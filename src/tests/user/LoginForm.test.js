/* eslint-disable no-undef */
import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginForm } from '../../user/components/LoginForm';

configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  let LoginFormWrapper;
  let loginUser;

  beforeEach(() => {
    loginUser = jest.fn();
  });

  it('renders properly with default props', () => {
    LoginFormWrapper = mount(<LoginForm loginUserAction={loginUser} />);
    expect(LoginFormWrapper).toMatchSnapshot();
  });

  it('renders properly with location.fromPath provided', () => {
    LoginFormWrapper = mount(<LoginForm loginUserAction={loginUser} />);
    LoginFormWrapper.setProps({ location: { fromPath: 'testpath' } });
    expect(LoginFormWrapper).toMatchSnapshot();
  });

  it('renders properly with currentUserName provided', () => {
    const LoginFormWrapperWithRouter = shallow(<LoginForm loginUserAction={loginUser} currentUserName="test username" />);
    expect(LoginFormWrapperWithRouter).toMatchSnapshot();
  });

  it('rerenders with updated state on username input change', () => {
    LoginFormWrapper = mount(<LoginForm loginUserAction={loginUser} />);
    const input = LoginFormWrapper.find('#username');
    input.simulate('change', { target: { name: 'username', value: 'username@example.com' } });

    expect(LoginFormWrapper.state('data').username).toBe('username@example.com');
  });

  it('rerenders with updated state on password input change', () => {
    LoginFormWrapper = mount(<LoginForm loginUserAction={loginUser} />);
    const input = LoginFormWrapper.find('#password');
    input.simulate('change', { target: { name: 'password', value: 'thepass' } });

    expect(LoginFormWrapper.state('data').password).toBe('thepass');
  });

  it('submits form properly after the from has been filled out', () => {
    LoginFormWrapper = shallow(<LoginForm loginUserAction={loginUser} />);
    LoginFormWrapper.setState({ data: { username: 'testuser', password: 'testpass' } });
    const form = LoginFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(loginUser).toHaveBeenCalledTimes(1);
  });
});
