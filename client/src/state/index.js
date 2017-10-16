import { extendObservable } from 'mobx';

const state = extendObservable({}, {
  mountBoardDialog: {
    isVisible: false,
    title: '',
    isPrivate: false
  },
  activeBoard: undefined,
  activePost: undefined,
  boards: [],
  newTitle: undefined,
  posts: [],
  postColors: [ 'yellow', 'red', 'green', 'paper-lined' ],
  selectedPostColor: 'yellow',
  isMenuExpanded: false
});

export default state;
