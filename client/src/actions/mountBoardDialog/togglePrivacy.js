import { action } from 'mobx';
import state from '../../state';

const togglePrivacy = action(() => {
  state.mountBoardDialog.isPrivate = !state.mountBoardDialog.isPrivate;
});

export default togglePrivacy;
