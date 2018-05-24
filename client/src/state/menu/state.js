import { observable } from 'mobx';

const state = observable.object({
  isExpanded: false,
  items: []
});

export default state;
