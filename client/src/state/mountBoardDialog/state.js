import { extendObservable } from 'mobx';

const state = extendObservable({}, {
  isVisible: false,
  title: '',
  isPrivate: false
});

export default state;
