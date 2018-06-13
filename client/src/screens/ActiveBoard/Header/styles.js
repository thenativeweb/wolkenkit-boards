const styles = theme => ({
  Form: {
    'margin-left': theme.grid.stepSize,
    'margin-bottom': 1
  },

  TextBox: {
    padding: '0.1em 0.5em 0.2em',
    'min-width': '250px',
    background: 'transparent',
    border: '1px transparent solid',
    transition: 'border 200ms, background 200ms, color 200ms',
    color: theme.color.brand.white,

    '&:hover, &:focus': {
      background: theme.color.brand.white,
      border: `1px solid ${theme.color.brand.dark}`,
      color: theme.color.brand.dark
    }
  }
});

export default styles;
