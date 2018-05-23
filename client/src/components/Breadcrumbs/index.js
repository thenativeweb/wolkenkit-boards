import injectSheet from 'react-jss';
import React from 'react';
import { Button, View } from 'thenativeweb-ux';
import { Link, Route, Switch } from 'react-router-dom';

const styles = theme => ({
  Breadcrumbs: {
    'flex-grow': 1,
    'flex-shrink': 1,
    'margin-left': theme.grid.stepSize
  },

  BackLink: {
    position: 'relative',
    'text-decoration': 'none',
    'margin-right': theme.grid.stepSize * 3,

    '& .BackButton': {
      margin: 0
    },

    '&:hover': {
      color: theme.color.brand.highlight,

      '& svg': {
        fill: theme.color.brand.highlight
      }
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      height: 20,
      width: 1,
      background: theme.color.brand.dark,
      top: 'calc(50% - 10px)',
      right: 0,
      'margin-right': '-15px'
    }
  }
});

const Breadcrumbs = ({ children, classes }) => (
  <View orientation='horizontal' alignItems='center' className={ classes.Breadcrumbs }>
    <Switch>
      <Route path='/board/:slug'>
        <Link to='/' className={ classes.BackLink }>
          <Button icon='arrow-west' iconSize='xs' isSubtle={ true } className={ classes.BackButton }>Boards</Button>
        </Link>
      </Route>
    </Switch>
    { children }
  </View>
);

export default injectSheet(styles)(Breadcrumbs);
