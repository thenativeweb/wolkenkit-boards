import paperLinedBackground from './images/post-paper-lined-background.svg';

const postWidth = 186;
const postLineHeight = 20;
const postBorderWidth = 3;
const postMetabarHeight = 35;
const contentPaddingTop = 9;

const styles = theme => ({
  Container: {
    'will-change': 'transform',
    'backface-visibility': 'hidden',
    position: 'absolute'
  },

  Post: {
    position: 'absolute',
    cursor: 'move',
    width: postWidth,
    'max-height': 2 * contentPaddingTop + 9 * postLineHeight + postMetabarHeight + 2 * postBorderWidth,
    'box-shadow': '1px 1px 4px rgba(0, 0, 0, 0.5)',
    'font-size': theme.font.size.default,
    'line-height': `${postLineHeight}px`,
    color: '#222',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    border: `${postBorderWidth}px solid transparent`,
    'will-change': 'transform, opacity',
    'backface-visibility': 'hidden'
  },

  Author: {},
  MetaButton: {},
  Content: {
    'flex-shrink': 1,
    'flex-grow': 1,
    'flex-basis': '100%'
  },

  Meta: {
    position: 'relative',
    display: 'flex',
    'flex-grow': 0,
    'flex-shrink': 0,
    'flex-basis': `${postMetabarHeight}px`,
    'justify-content': 'space-between',
    height: postMetabarHeight,
    'font-size': theme.font.size.small,
    'line-height': `${postMetabarHeight}px`,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: theme.grid.stepSize,
      right: theme.grid.stepSize,
      height: 1,
      background: 'rgba(0, 0, 0, 0.25)'
    },

    '& $Author': {
      'flex-grow': 1,
      'flex-shrink': 1,
      color: 'rgba(0, 0, 0, 0.5)',
      'margin-left': theme.grid.stepSize
    },

    '& $MetaButton': {
      display: 'flex',
      'margin-right': theme.grid.stepSize,

      '& svg': {
        fill: 'rgba(0, 0, 0, 0.5)'
      },

      '&:hover svg': {
        fill: 'rgba(0, 0, 0, 0.8)'
      }
    }
  },

  IsDragging: {
    transition: 'transform 5ms !important',
    cursor: 'move !important',
    'user-select': 'none !important'
  },

  IsSelected: {
    border: `${postBorderWidth} solid #fff`
  },

  ColorYellow: {
    'background-color': '#ff9',

    '&$IsBeingEdited': {
      'border-color': '#7a7a00'
    }
  },

  ColorRed: {
    'background-color': '#fd765e',

    '&$IsBeingEdited': {
      'border-color': '#ab1c02'
    }
  },

  ColorGreen: {
    'background-color': '#96e55d',

    '&$IsBeingEdited': {
      'border-color': '#396f12'
    }
  },

  ColorPaperLined: {
    background: `#f2f1f0 url('${paperLinedBackground}') 10px -2px repeat-y`,

    '& $Meta': {
      background: '#f2f1f0'
    },

    '&$IsBeingEdited': {
      'border-color': '#6b89a2'
    }
  },

  TypeText: {
    '& $Content': {
      outline: 0,
      background: 'none',
      color: 'inherit',
      width: '100%',
      'min-height': '150px',
      'max-height': 2 * contentPaddingTop + 9 * postLineHeight,
      'box-sizing': 'border-box',
      margin: 0,
      'font-weight': 'inherit',
      'white-space': 'pre-wrap',
      'word-wrap': 'break-word',
      position: 'relative',
      'pointer-events': 'none',
      overflow: 'hidden',

      '& div, & textarea': {
        display: 'block',
        '-webkit-appearance': 'none',
        outline: 'inherit',
        background: 'transparent',
        border: 0,
        color: 'inherit',
        width: '100%',
        resize: 'none',
        'box-sizing': 'border-box',
        padding: `${contentPaddingTop}px 10px`,
        margin: 0,
        'line-height': 'inherit',
        'font-size': theme.font.size.default,
        'font-family': theme.font.family.default,
        'font-weight': 400,
        'letter-spacing': '-0.02em',
        'white-space': 'pre-wrap',
        'word-wrap': 'break-word',
        position: 'relative',
        cursor: 'pointer',
        'pointer-events': 'none',

        '& a': {
          'white-space': 'inherit',
          'word-wrap': 'break-word',
          color: 'inherit',
          'text-decoration': 'underline',
          'pointer-events': 'all'
        }
      }
    }
  },

  TypeImage: {
    background: theme.color.brand.white,
    border: 0,
    padding: 0,
    margin: 0,
    height: 'auto',
    overflow: 'hidden',
    'white-space': 'normal',
    display: 'flex',
    'flex-direction': 'column',

    '& $Content': {
      'max-height': postWidth,
      overflow: 'hidden',

      '& img': {
        'pointer-events': 'none',
        width: '100%',
        flex: '1 1 auto'
      }
    },

    '& $Meta': {
      '&::after': {
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }
  },

  IsDone: {
    transition: 'opacity 0.25s ease-out',
    opacity: '0.2 !important'
  },

  IsBeingEdited: {
    '& $Content textarea': {
      cursor: 'text',
      'user-select': 'text',
      'pointer-events': 'all'
    }
  }
});

export default styles;
