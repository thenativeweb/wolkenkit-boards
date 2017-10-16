import { action } from 'mobx';
import state from '../../state';

const stopEditing = action(() => {
  state.newTitle = undefined;
});

export default stopEditing;
