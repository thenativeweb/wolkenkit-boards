import state from '../../state';
import { action, extendObservable } from 'mobx';

const hide = action(() => {
  extendObservable(state, {
    mountBoardDialog: {
      isVisible: false,
      title: '',
      isPrivate: false
    }
  });
});

export default hide;
