import injectSheet from 'react-jss';
import React from 'react';
import { Button, Icon, View } from 'thenativeweb-ux';
import { Link, Route, Switch } from 'react-router-dom';

const styles = theme => ({
  Breadcrumbs: {
    'flex-grow': 1,
    'flex-shrink': 1,
    'margin-left': theme.grid.stepSize
  },

  BackLink: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    'text-decoration': 'none',
    'margin-left': theme.grid.stepSize * 2,
    'margin-right': theme.grid.stepSize * 3,

    '&:hover': {
      '& $BackIcon': {
        fill: theme.color.brand.highlight
      },

      '& $BackButton': {
        color: theme.color.brand.highlight
      }
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      height: 20,
      width: 1,
      background: theme.color.brand.midGrey,
      top: 'calc(50% - 10px)',
      right: 0,
      'margin-right': theme.grid.stepSize * -2
    }
  },

  BackIcon: {
    fill: theme.color.brand.lightGrey
  },

  BackButton: {
    color: theme.color.brand.lightGrey
  }
});

const Breadcrumbs = ({ children, classes }) => (
  <View orientation='horizontal' alignItems='center' className={ classes.Breadcrumbs }>
    <Switch>
      <Route path='/board/:slug'>
        <Link to='/' className={ classes.BackLink }>
          <Icon name='arrow-west' size='xs' className={ classes.BackIcon } />
          <Button isSubtle={ true } className={ classes.BackButton }>Boards</Button>
        </Link>
      </Route>
    </Switch>
    { children }
  </View>
);

export default injectSheet(styles)(Breadcrumbs);
