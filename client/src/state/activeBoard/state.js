import { extendObservable } from 'mobx';

const state = extendObservable({}, {
  id: undefined,
  title: undefined,
  slug: undefined,
  posts: [],
  activePost: undefined,
  newTitle: undefined,
  selectedPostColor: 'yellow'
});

export default state;
