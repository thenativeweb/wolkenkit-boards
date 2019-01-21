import React from 'react';
import { View } from 'thenativeweb-ux';
import { withStyles } from 'thenativeweb-ux/dist/styles';

const styles = theme => ({
  AppBar: {
    'flex-grow': 0,
    'flex-shrink': 0,
    background: 'rgba(0,0,0,0.15)',
    height: theme.grid.stepSize * 4,
    'z-index': theme.zIndex.navigation + 10,
    position: 'fixed',
    width: '100%'
  }
});

const AppBar = ({ children, classes }) => (
  <View orientation='horizontal' alignItems='center' className={ classes.AppBar }>
    { children }
  </View>
);

export default withStyles(styles)(AppBar);
