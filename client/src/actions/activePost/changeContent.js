import { action } from 'mobx';
import state from '../../state';

const changeContent = action(newContent => {
  state.activePost.content = newContent;
});

export default changeContent;
