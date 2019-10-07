/* eslint-disable no-undef */
import * as Yup from 'yup';

import ControlBase from '../../../app/shared/components/controls/ControlBase';


describe('<ControlBase />', () => {
  let onChange;
  const fakeSchema = Yup.string().min(5, 'too short').required();
  let controlBaseTest;

  beforeEach(() => {
    onChange = jest.fn();
    controlBaseTest = new ControlBase();
    controlBaseTest.props = { onChange, validationSchema: fakeSchema };
  });

  it('call onChange with fake event and errors===null', () => {
    const fakeEvent = { currentTarget: { name: 'testname', value: 'testvalue' } };
    controlBaseTest.handleChange(fakeEvent);
    expect(onChange).toHaveBeenCalledWith(fakeEvent, null);
  });

  it('call onChange with fake event and error===too short ', () => {
    const fakeEvent = { currentTarget: { name: 'testname', value: 'test' } };
    controlBaseTest.handleChange(fakeEvent);
    expect(onChange).toHaveBeenCalledWith(fakeEvent, 'too short');
  });

  it('returns null on control validation whithout matchedInput provided and valid entered value', () => {
    const fakeControl = { name: 'testname', value: 'testvalue' };
    const error = controlBaseTest.validateControl(fakeControl);
    expect(error).toBeNull();
  });

  it('returns error on control validation whithout matchedInput provided and invalid entered value', () => {
    const fakeControl = { name: 'testname', value: 'test' };
    const error = controlBaseTest.validateControl(fakeControl);
    expect(error).toBe('too short');
  });

  it('returns error if matchedInput is not equal to entered value', () => {
    controlBaseTest.props = { ...controlBaseTest.props, matchedInput: { name: 'matchedinput', value: 'notequal' } };
    const fakeControl = { name: 'testname', value: 'testvalue' };
    const error = controlBaseTest.validateControl(fakeControl);
    expect(error).toBe('The value does not match to matchedinput');
  });

  it('returns no error if matchedInput is equal to entered value', () => {
    controlBaseTest.props = { ...controlBaseTest.props, matchedInput: { name: 'matchedinput', value: 'testvalue' } };
    const fakeControl = { name: 'testname', value: 'testvalue' };
    const error = controlBaseTest.validateControl(fakeControl);
    expect(error).toBeNull();
  });
});
