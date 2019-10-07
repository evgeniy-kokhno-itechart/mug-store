/* eslint-disable no-undef */
import React from 'react';
import * as Yup from 'yup';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormBase from '../../../app/shared/components/controls/FormBase';


// Create mock form component
class MockForm extends FormBase {
    state = {
      data: { firstField: '', secondField: '' },
      errors: {},
    };

    loginObjectSchema = {
      firstField: Yup.string().min(5).required(),
      secondField: Yup.string().min(5).required(),
    };

    render() {
      const { data, errors } = this.state;
      return (
        <React.Fragment>
          <p>
                data:
            {data}
          </p>
          <p>
                errors:
            {errors}
          </p>
        </React.Fragment>
      );
    }
}


configure({ adapter: new Adapter() });

describe('<FormBase />', () => {
  const fakeObjectSchema = {
    firstField: Yup.string().min(5, 'the first one is too short').required(),
    secondField: Yup.string().min(5, 'the second one is too short').required(),
  };
  let FormBaseTest;
  let MockFormWrapper;

  beforeEach(() => {
    MockFormWrapper = shallow(<MockForm />);
    FormBaseTest = new FormBase();
  });

  it('call validateForm and returns error with fake state.data is not valid', () => {
    FormBaseTest.state.data = { firstField: 'first', secondField: 'test' };
    const validationResult = FormBaseTest.validateForm(fakeObjectSchema);
    expect(validationResult).toEqual({ secondField: 'the second one is too short' });
  });

  it('call validateForm and returns null with fake state.data is valid', () => {
    FormBaseTest.state.data = { firstField: 'first', secondField: 'second' };
    const validationResult = FormBaseTest.validateForm(fakeObjectSchema);
    expect(validationResult).toBeNull();
  });

  it('call handleControlChange new value and without error and updates state', () => {
    const fakeData = { firstField: 'first', secondField: 'second' };
    MockFormWrapper.setState({ data: fakeData });
    const fakeEvent = { currentTarget: { name: 'secondField', value: 'secondupdated' } };
    MockFormWrapper.instance().handleControlChange(fakeEvent, null);

    expect(MockFormWrapper.state()).toEqual({ data: { firstField: 'first', secondField: 'secondupdated' }, errors: {} });
  });

  it('call handleControlChange with new value and error and updates state to new value and error is provided error', () => {
    const fakeData = { firstField: 'first', secondField: 'second' };
    MockFormWrapper.setState({ data: fakeData });
    const fakeEvent = { currentTarget: { name: 'secondField', value: '123' } };
    MockFormWrapper.instance().handleControlChange(fakeEvent, 'test error');
    expect(MockFormWrapper.state()).toEqual({
      data: { firstField: 'first', secondField: '123' },
      errors: { secondField: 'test error' },
    });
  });

  it('call handleControlChange with new value and error and updates state to new value and deletes an existed error', () => {
    const fakeData = { firstField: 'first', secondField: 'second' };
    MockFormWrapper.setState({ data: fakeData, errors: { secondField: 'test error' } });
    const fakeEvent = { currentTarget: { name: 'secondField', value: 'secondupdated' } };
    MockFormWrapper.instance().handleControlChange(fakeEvent, null);
    expect(MockFormWrapper.state()).toEqual({ data: { firstField: 'first', secondField: 'secondupdated' }, errors: {} });
  });
});
