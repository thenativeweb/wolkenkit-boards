import background from '../theme/images/background.png';

const styles = {
  '@global': {
    body: {
      background: `url('${background}') left top repeat`
    }
  },

  SidebarItemDisabled: {
    '& svg': {
      opacity: 0.3
    },
    'pointer-events': 'none'
  },

  UserAvatar: {
    '& img': {
      width: '36px !important',
      height: '36px !important'
    }
  }
};

export default styles;
