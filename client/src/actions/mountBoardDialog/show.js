import state from '../../state';
import { action, extendObservable } from 'mobx';

const show = action(() => {
  extendObservable(state, {
    mountBoardDialog: {
      isVisible: true,
      title: '',
      isPrivate: false
    }
  });
});

export default show;
