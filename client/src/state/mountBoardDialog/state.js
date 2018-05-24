import { observable } from 'mobx';

const state = observable.object({
  isVisible: false,
  title: '',
  isPrivate: false
});

export default state;
