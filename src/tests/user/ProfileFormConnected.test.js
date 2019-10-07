/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProfileFormConnected } from '../../app/user/containers/ProfileFormConnected';

configure({ adapter: new Adapter() });

describe('<ProfileForm />', () => {
  let ProfileFormWrapper;
  let saveEditedUserInfo;
  let registerNewUserAndLogin;
  const fakeUserData = {
    address: 'Test Adress',
    city: 'Test city',
    country: 'Test country',
    name: 'Test user name',
    phone: '+000000000000',
    roles: ['user'],
    username: 'user@user.com',
    password: 'thepass',
    confirmPassword: 'thepass',
  };

  beforeEach(() => {
    saveEditedUserInfo = jest.fn();
    registerNewUserAndLogin = jest.fn();
    ProfileFormWrapper = shallow(
      <ProfileFormConnected
        saveEditedUserInfo={saveEditedUserInfo}
        registerNewUserAndLogin={registerNewUserAndLogin}
      />,
    );
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

  it('calls registerNewUserAndLogin if user id is empty', () => {
    ProfileFormWrapper.instance().handleSubmit(fakeUserData);
    expect(registerNewUserAndLogin).toHaveBeenCalledWith(fakeUserData);
  });

  it('calls saveEditedUserInfo if user id is not empty', () => {
    const fakeUserDataWithId = { id: '1', ...fakeUserData };
    ProfileFormWrapper.instance().handleSubmit(fakeUserDataWithId);
    expect(saveEditedUserInfo).toHaveBeenCalledWith(fakeUserDataWithId);
  });
});
