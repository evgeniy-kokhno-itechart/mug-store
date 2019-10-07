/* eslint-disable no-undef */
import { defineHttpAction } from '../../../app/shared/services/ActionsService';

describe('ActionService', () => {
  it('shoild create an object with action names consist of TEST and proper postfixes', () => {
    expect(defineHttpAction('TEST')).toEqual({
      InitiateApiCall: 'TEST_INITIATE_API_CALL',
      CallIsInProgress: 'TEST_CALL_IS_IN_PROGRESS',
      Failure: 'TEST_FAILURE',
      Success: 'TEST_SUCCESS',
    });
  });
});
