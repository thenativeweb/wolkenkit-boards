import { action } from 'mobx';

const createAction = function (initialState, actionImplementation, name) {
  if (!name) {
    return actionImplementation(initialState);
  }

  return action(name, actionImplementation(initialState));
};

export default createAction;
