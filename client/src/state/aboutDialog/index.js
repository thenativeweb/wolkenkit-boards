import createAction from '../createAction';
import initialState from './initialState';
import { observable, set } from 'mobx';

const state = observable.object(initialState);

export default {
  state,

  hide: createAction(state, currentState => () => {
    set(currentState, { isVisible: false });
  }),

  show: createAction(state, currentState => () => {
    set(currentState, { isVisible: true });
  })
};
