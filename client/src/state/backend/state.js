import { observable } from 'mobx';

const state = observable.object({
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
