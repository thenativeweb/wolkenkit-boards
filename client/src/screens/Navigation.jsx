import React from 'react';
import { Icon, Label } from '../components';
import { Link, Route, Switch } from 'react-router-dom';

const Navigation = function () {
  return (
    <Switch>
      <Route path='/board/:slug'>
        <Link to='/' className='ui-back-link'>
          <Icon name='arrow-east' size='xsmall' />
          <Label>Boards</Label>
        </Link>
      </Route>
    </Switch>
  );
};

export default Navigation;
