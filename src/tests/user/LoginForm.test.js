/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginForm } from '../../app/user/components/LoginForm/LoginForm';

configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  let LoginFormWrapper;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    LoginFormWrapper = shallow(<LoginForm onSubmit={onSubmit} />);
  });

  it('renders properly with default props', () => {
    expect(LoginFormWrapper).toMatchSnapshot();
  });

  it('submits form properly after the from has been filled out', () => {
    const loginData = { username: 'testuser', password: 'testpass' };
    LoginFormWrapper.setState({ data: loginData });
    const form = LoginFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(onSubmit).toHaveBeenCalledWith(loginData.username, loginData.password);
  });
});
