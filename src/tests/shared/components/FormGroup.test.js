/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormGroup from '../../../app/shared/components/markup/FormGroup/FormGroup';

configure({ adapter: new Adapter() });

describe('<FormGroup />', () => {
  let FormGroupWrapper;

  beforeEach(() => {
    FormGroupWrapper = shallow(
      <FormGroup
        name='testname'
        label='Test label'
      >
        <span>test child</span>
      </FormGroup>,
    );
  });

  it('renders properly with default props', () => {
    expect(FormGroupWrapper).toMatchSnapshot();
  });

  it('renders properly with error', () => {
    FormGroupWrapper.setProps({ error: 'test error' });
    expect(FormGroupWrapper).toMatchSnapshot();
  });

  it('renders properly with labelClasses', () => {
    FormGroupWrapper.setProps({ labelClasses: 'testlabelclass' });
    expect(FormGroupWrapper).toMatchSnapshot();
  });

  it('renders properly with groupClasses', () => {
    FormGroupWrapper.setProps({ groupClasses: 'testgroupclass' });
    expect(FormGroupWrapper).toMatchSnapshot();
  });
});
