import state from '../../state';
import { action, extendObservable } from 'mobx';

const startEditing = action(({ title }) => {
  extendObservable(state, {
    newTitle: title
  });
});

export default startEditing;
