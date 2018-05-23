const styles = theme => ({
  BoardsScreen: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'center',
    padding: [ theme.grid.stepSize * 6, 0 ]
  },

  List: {
    'flex-grow': 0,
    'flex-shrink': 0,
    'flex-basis': 'auto',
    width: '50%'
  }
});

export default styles;
