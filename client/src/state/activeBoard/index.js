import backend from '../backend';
import changeActivePost from './changeActivePost';
import changeTitle from './changeTitle';
import initialState from './initialState';
import { observable } from 'mobx';
import selectPostColor from './selectPostColor';
import startEditingPost from './startEditingPost';
import startEditingTitle from './startEditingTitle';
import startReading from './startReading';
import stopEditingPost from './stopEditingPost';
import stopEditingTitle from './stopEditingTitle';

const state = observable.object(initialState);

export default {
  state,

  changeActivePost: changeActivePost(state),
  changeTitle: changeTitle(state),
  selectPostColor: selectPostColor(state),
  startEditingPost: startEditingPost(state),
  startEditingTitle: startEditingTitle(state),
  startReading: startReading(state, backend),
  stopEditingPost: stopEditingPost(state),
  stopEditingTitle: stopEditingTitle(state)
};
