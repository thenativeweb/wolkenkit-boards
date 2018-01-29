import { extendObservable } from 'mobx';

const state = extendObservable({}, {
  isExpanded: false,
  items: []
});

export default state;
