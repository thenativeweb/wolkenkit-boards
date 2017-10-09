import { action } from 'mobx';
import state from '../../state';

const changeText = action(newText => {
  state.activePostContent = newText;
});

export default changeText;
