/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProfileForm from '../../app/user/components/ProfileForm';

configure({ adapter: new Adapter() });

describe('<ProfileForm />', () => {
  let ProfileFormWrapper;
  let onSubmit;
  const fakeData = {
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
    onSubmit = jest.fn();
  });

  it('renders properly with default props', () => {
    ProfileFormWrapper = shallow(<ProfileForm onSubmit={onSubmit} />);
    expect(ProfileFormWrapper).toMatchSnapshot();
  });

  it('renders properly with user data provided', () => {
    ProfileFormWrapper = shallow(
      <ProfileForm
        onSubmit={onSubmit}
        user={{
          id: '1',
          address: 'Test Adress',
          city: 'Test city',
          country: 'Test country',
          name: 'Test user name',
          phone: '+000000000000',
          roles: ['user'],
          username: 'user@user.com',
        }}
      />,
    );
    expect(ProfileFormWrapper).toMatchSnapshot();
  });

  it('submits form properly after the from has been filled out with new user info', () => {
    ProfileFormWrapper = shallow(<ProfileForm onSubmit={onSubmit} />);
    ProfileFormWrapper.setState({
      data: fakeData,
    });
    const form = ProfileFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(onSubmit).toHaveBeenCalledWith(fakeData);
  });
});
