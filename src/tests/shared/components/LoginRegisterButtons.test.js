/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginRegisterButtons from '../../../app/shared/components/markup/LoginRegisterButtons/LoginRegisterButtons';

configure({ adapter: new Adapter() });

describe('<LoginRegisterButtons />', () => {
  let LoginRegisterButtonsWrapper;

  beforeEach(() => {
    LoginRegisterButtonsWrapper = shallow(<LoginRegisterButtons />);
  });

  it('renders properly with default props', () => {
    expect(LoginRegisterButtonsWrapper).toMatchSnapshot();
  });
});
