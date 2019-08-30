/* eslint-disable no-undef */
import * as Yup from 'yup';
import FormService from '../../services/general/formService';

describe('form service', () => {
  const fakeSchema = {
    username: Yup.string()
      .required()
      .min(5),
    name: Yup.string()
      .required()
      .min(7),
  };

  it('validateForm method should return object within 2 errors on validateForm', () => {
    const fakeFormState = { username: '123', name: '456' };
    const expectedValidationResult = { name: 'name must be at least 7 characters', username: 'username must be at least 5 characters' };

    expect(FormService.validateForm(fakeSchema, fakeFormState)).toEqual(expectedValidationResult);
  });

  it('validateForm method should return null on validateForm for accurate state provided', () => {
    const fakeFormState = { username: '12345', name: '1234567' };

    expect(FormService.validateForm(fakeSchema, fakeFormState)).toBeNull();
  });

  it('handleChange method should return state within new data and validation errors for short input value', () => {
    const fakePrevState = { data: { username: '', name: '' }, errors: {} };
    const fakeInputData = { name: 'username', value: '123' };

    const expectedState = { data: { username: '123', name: '' }, errors: { username: 'username must be at least 5 characters' } };

    expect(FormService.handleChange(fakeInputData, null, fakePrevState, fakeSchema)).toEqual(expectedState);
  });

  it('handleChange method should return state within new data and errors for unmached inputs that must be equal', () => {
    const fakePrevState = { data: { username: '', name: '' }, errors: {} };
    const fakeInputData = { name: 'username', value: '123' };

    const expectedState = { data: { username: '123', name: '' }, errors: { username: 'The value does not match to name' } };

    expect(FormService.handleChange(fakeInputData, 'name', fakePrevState, fakeSchema)).toEqual(expectedState);
  });
});
