/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

const ActionsStatusEnum = Object.freeze({
  InitiateApiCall: 'INITIATE_API_CALL',
  CallIsInProgress: 'CALL_IS_IN_PROGRESS',
  Failure: 'FAILURE',
  Success: 'SUCCESS',
});

export function defineHttpAction(actionName) {
  let action = {};
  const actionsStatusEnumKeys = Object.keys(ActionsStatusEnum);
  // avoided for of loop due to arbnb restriction
  for (let i = 0; i < actionsStatusEnumKeys.length; i++) {
    action = {
      ...action,
      [actionsStatusEnumKeys[i]]: `${actionName}_${ActionsStatusEnum[actionsStatusEnumKeys[i]]}`,
    };
  }
  return action;
}

export default function createHttpAction(actionName) {
  const actions = defineHttpAction(actionName);
  return {
    InitiateApiCall: createAction(actions.InitiateApiCall),
    CallIsInProgress: createAction(actions.CallIsInProgress),
    Failure: createAction(actions.Failure),
    Success: createAction(actions.Success),
  };
}
