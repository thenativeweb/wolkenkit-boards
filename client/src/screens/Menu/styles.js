const styles = theme => ({
  Footer: {
    background: theme.color.brand.dark,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    'text-align': 'center',
    'padding-top': theme.grid.stepSize * 1.5,
    'font-weight': 300,

    '& > div': {
      'padding-bottom': theme.grid.stepSize * 2
    },

    '& a': {
      'text-decoration': 'none'
    }
  },

  Sponsors: {
    'margin-top': theme.grid.stepSize,
    'padding-top': theme.grid.stepSize * 1.5,
    'border-top': '1px solid rgba(255, 255, 255, 0.1)'
  }
});

export default styles;
