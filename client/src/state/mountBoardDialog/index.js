import createAction from '../createAction';
import initialState from './initialState';
import { observable, set } from 'mobx';

const state = observable.object(initialState);

export default {
  state,

  show: createAction(state, currentState => () => {
    set(currentState, {
      isVisible: true,
      title: '',
      isPrivate: false
    });
  }),

  hide: createAction(state, currentState => () => {
    set(currentState, {
      isVisible: false
    });
  }),

  changeTitle: createAction(state, currentState => title => {
    set(currentState, { title });
  }),

  togglePrivacy: createAction(state, currentState => () => {
    set(currentState, {
      isPrivate: !currentState.isPrivate
    });
  })
};
