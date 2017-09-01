import React from 'react';
import styles from './Breadcrumbs.css';
import { Icon, Label } from './index';
import { Link, Route, Switch } from 'react-router-dom';

const Breadcrumbs = ({ children }) => (
  <div className={ styles.Breadcrumbs }>
    <Switch>
      <Route path='/board/:slug'>
        <Link to='/' className={ styles.BackLink }>
          <Icon className={ styles.BackLinkIcon } name='arrow-west' size='xs' style={{ marginRight: 8 }} />
          <Label>Boards</Label>
        </Link>
      </Route>
    </Switch>
    { children }
  </div>
);

export default Breadcrumbs;
