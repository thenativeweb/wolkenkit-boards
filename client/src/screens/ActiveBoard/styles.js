import boardBackground from '../../theme/images/board-background.png';

const styles = theme => ({
  ActiveBoardScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  Posts: {
    position: 'relative',
    width: '1280px',
    height: '962px',
    margin: '0 auto',
    'user-select': 'none',
    background: `url('${boardBackground}') left top no-repeat`,
    opacity: 1,
    overflow: 'visible'
  },

  ColorTogglePanel: {
    display: 'flex',
    flexDirection: 'row',
    'justify-content': 'flex-end',
    alignItems: 'center',
    position: 'fixed',
    right: theme.grid.stepSize,
    top: 3,
    'z-index': theme.zIndex.menu,
    padding: 5,
    borderRadius: 4,

    '& label': {
      'padding-right': theme.grid.stepSize,
      'padding-bottom': 2,
      'line-height': 1,
      color: theme.color.brand.midGrey
    }
  },

  ColorToggle: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-end'
  },

  ColorToggleButton: {
    width: theme.grid.stepSize * 2.5,
    height: theme.grid.stepSize * 2.5,
    cursor: 'pointer',
    display: 'block',
    margin: 0,
    padding: 0,
    border: 'none !important',

    position: 'relative',

    '& > div': {
      display: 'inline'
    },

    '&:hover $Color': {
      transform: 'scale(1.25)'
    },

    '&:focus': {
      border: 'none !important'
    }
  },

  ColorToggleButtonSelected: {
    '& $Color': {
      transform: 'scale(1.5) !important'
    }
  },

  Color: {
    display: 'block',
    'box-sizing': 'border-box',
    width: 12,
    height: 12,
    borderRadius: '100%',
    left: 6,
    top: 6,
    position: 'absolute',
    transform: 'scaleY(1)',
    'transform-origin': 'center center',
    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    'will-change': 'transform',
    'pointer-events': 'none',
    'box-shadow': '1px 1px 3px rgba(0, 0, 0, 0.1)',

    '&.green': {
      background: '#96e55d'
    },

    '&.paper-lined': {
      background: '#f2f1f0'
    },

    '&.red': {
      background: '#fd765e'
    },

    '&.yellow': {
      background: '#ff9'
    }
  }
});

export default styles;
