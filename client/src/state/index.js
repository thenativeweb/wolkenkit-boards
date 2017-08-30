import { extendObservable } from 'mobx';

const state = extendObservable({}, {
  activeBoard: undefined,
  boards: [],
  newBoardTitle: undefined,
  posts: [],
  postColors: [ 'yellow', 'red', 'green', 'paper-lined' ],
  selectedPostColor: 'yellow',
  isMenuExpanded: false
});

export default state;
