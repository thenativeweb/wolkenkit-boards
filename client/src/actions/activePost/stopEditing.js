import { action } from 'mobx';
import state from '../../state';

const stopEditing = action(() => {
  state.activePost = undefined;
});

export default stopEditing;
