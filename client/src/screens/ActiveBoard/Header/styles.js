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
    transition: 'border 400ms, background 400ms',

    '&:hover, &:focus': {
      background: theme.color.brand.white,
      border: `1px solid ${theme.color.brand.dark}`,
      color: theme.color.brand.dark
    }
  }
});

export default styles;
