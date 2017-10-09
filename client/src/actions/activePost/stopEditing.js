import { action } from 'mobx';
import state from '../../state';

const stopEditing = action(() => {
  state.activePostId = undefined;
  state.activePostContent = undefined;
});

export default stopEditing;
