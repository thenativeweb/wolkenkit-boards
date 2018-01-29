import { extendObservable } from 'mobx';

const state = extendObservable({}, {
  host: undefined,
  port: undefined,
  isConnected: false,
  user: undefined,
  api: undefined,
  error: undefined,
  lists: {
    boards: [],
    posts: []
  }
});

export default state;
