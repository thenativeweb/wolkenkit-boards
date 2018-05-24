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

  ColorToggle: {
    height: theme.grid.stepSize * 3,
    display: 'flex',
    'justify-content': 'flex-end',
    position: 'fixed',
    left: '50%',
    'margin-left': '-62px',
    top: theme.grid.stepSize * 4 - 1,
    'z-index': theme.zIndex.navigation
  },

  ColorToggleButton: {
    width: theme.grid.stepSize * 3,
    height: theme.grid.stepSize * 3,
    cursor: 'pointer',
    display: 'block',
    margin: 0,
    padding: 0,
    border: 'none !important',
    'margin-left': 5,
    'margin-right': 5,
    position: 'relative',

    '& > div': {
      display: 'inline'
    },

    '&:hover $Color': {
      transform: 'scaleY(2.5)'
    },

    '&:focus': {
      border: 'none !important'
    }
  },

  ColorToggleButtonSelected: {
    '& $Color': {
      transform: 'scaleY(2.5)'
    }
  },

  Color: {
    display: 'block',
    'box-sizing': 'border-box',
    width: (theme.grid.stepSize * 3) - 6,
    height: 6,
    left: 0,
    top: 0,
    position: 'absolute',
    'margin-left': 3,
    'margin-right': 3,
    'box-shadow': '1px 1px 3px rgba(0, 0, 0, 0.3)',
    transform: 'scaleY(1)',
    'transform-origin': 'top center',
    transition: 'transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)',
    'will-change': 'transform',
    'pointer-events': 'none',

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
