/* eslint-disable no-undef */
import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProfileForm } from '../../user/components/ProfileForm';

configure({ adapter: new Adapter() });

describe('<ProfileForm />', () => {
  let ProfileFormWrapper;
  let saveEditedUserInfo;
  let registerNewUserAndLogin;

  beforeEach(() => {
    saveEditedUserInfo = jest.fn();
    registerNewUserAndLogin = jest.fn();
    ProfileFormWrapper = mount(<ProfileForm saveEditedUserInfo={saveEditedUserInfo} registerNewUserAndLogin={registerNewUserAndLogin} />);
  });

  it('renders properly with default props', () => {
    expect(ProfileFormWrapper).toMatchSnapshot();
  });

  it('renders properly with user data provided', () => {
    ProfileFormWrapper.setProps({
      user: {
        id: '1',
        address: 'Test Adress',
        city: 'Test city',
        country: 'Test country',
        name: 'Test user name',
        phone: '+000000000000',
        roles: ['user'],
        username: 'user@user.com',
      },
    });
    expect(ProfileFormWrapper).toMatchSnapshot();
  });

  it('rerenders with updated state on username input change', () => {
    const input = ProfileFormWrapper.find('#username');
    input.simulate('change', { target: { name: 'username', value: 'username@example.com' } });

    expect(ProfileFormWrapper.state('data').username).toBe('username@example.com');
  });

  it('rerenders with updated state on name input change', () => {
    const input = ProfileFormWrapper.find('#name');
    input.simulate('change', { target: { name: 'name', value: 'testname' } });

    expect(ProfileFormWrapper.state('data').name).toBe('testname');
  });

  it('rerenders with updated state on city input change', () => {
    const input = ProfileFormWrapper.find('#city');
    input.simulate('change', { target: { name: 'city', value: 'test city' } });

    expect(ProfileFormWrapper.state('data').city).toBe('test city');
  });

  it('rerenders with updated state on address input change', () => {
    const input = ProfileFormWrapper.find('#address');
    input.simulate('change', { target: { name: 'address', value: 'test adress' } });

    expect(ProfileFormWrapper.state('data').address).toBe('test adress');
  });

  it('rerenders with updated state on phone input change', () => {
    const input = ProfileFormWrapper.find('#phone');
    input.simulate('change', { target: { name: 'phone', value: '+000000000011' } });

    expect(ProfileFormWrapper.state('data').phone).toBe('+000000000011');
  });

  it('rerenders with updated state on password input change', () => {
    const input = ProfileFormWrapper.find('#password');
    input.simulate('change', { target: { name: 'password', value: 'thepass' } });

    expect(ProfileFormWrapper.state('data').password).toBe('thepass');
  });

  it('rerenders with updated state on confirmPassword input change', () => {
    const input = ProfileFormWrapper.find('#confirmPassword');
    input.simulate('change', { target: { name: 'confirmPassword', value: 'thepass' } });

    expect(ProfileFormWrapper.state('data').confirmPassword).toBe('thepass');
  });

  it('submits form properly after the from has been filled out with new user info', () => {
    ProfileFormWrapper.setState({
      data: {
        address: 'Test Adress',
        city: 'Test city',
        country: 'Test country',
        name: 'Test user name',
        phone: '+000000000000',
        roles: ['user'],
        username: 'user@user.com',
        password: 'thepass',
        confirmPassword: 'thepass',
      },
    });
    const form = ProfileFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(registerNewUserAndLogin).toHaveBeenCalledTimes(1);
  });

  it('submits form properly after info in the from has been edited', () => {
    ProfileFormWrapper.setProps({
      user: {
        id: '1',
        address: 'Test Adress',
        city: 'Test city',
        country: 'Test country',
        name: 'Test user name',
        phone: '+000000000000',
        roles: ['user'],
        username: 'user@user.com',
      },
    });
    ProfileFormWrapper.find('#name').simulate('change', { target: { name: 'name', value: 'user name edited' } });
    ProfileFormWrapper.find('#password').simulate('change', { target: { name: 'password', value: 'thepass' } });
    ProfileFormWrapper.find('#confirmPassword').simulate('change', { target: { name: 'confirmPassword', value: 'thepass' } });

    const form = ProfileFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(saveEditedUserInfo).toHaveBeenCalledTimes(1);
  });
});
