import { observable } from 'mobx';

const state = observable.object({
  id: undefined,
  title: undefined,
  slug: undefined,
  posts: [],
  activePost: undefined,
  newTitle: undefined,
  selectedPostColor: 'yellow'
});

export default state;
