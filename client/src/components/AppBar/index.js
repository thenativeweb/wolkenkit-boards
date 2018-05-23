import injectSheet from 'react-jss';
import React from 'react';
import { View } from 'thenativeweb-ux';

const styles = theme => ({
  AppBar: {
    'flex-grow': 0,
    'flex-shrink': 0,
    background: theme.color.panelBackground,
    'box-shadow': theme.shadow.overlay,
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

export default injectSheet(styles)(AppBar);
