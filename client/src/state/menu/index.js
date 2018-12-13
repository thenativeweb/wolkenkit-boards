import clearItems from './clearItems';
import collapse from './collapse';
import expand from './expand';
import initialState from './initialState';
import isEnabled from './isEnabled';
import { observable } from 'mobx';
import registerItems from './registerItems';

const state = observable.object(initialState);

export default {
  state,

  clearItems: clearItems(state),
  collapse: collapse(state),
  expand: expand(state),
  isEnabled: isEnabled(state),
  registerItems: registerItems(state)
};
