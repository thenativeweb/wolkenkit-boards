import { Button } from 'thenativeweb-ux';
import React from 'react';
import styles from './Breadcrumbs.css';
import { Link, Route, Switch } from 'react-router-dom';

const Breadcrumbs = ({ children }) => (
  <div className={ styles.Breadcrumbs }>
    <Switch>
      <Route path='/board/:slug'>
        <Link to='/' className={ styles.BackLink }>
          <Button icon='arrow-west' iconSize='s' isSubtle={ true } className={ styles.BackButton }>Boards</Button>
        </Link>
      </Route>
    </Switch>
    { children }
  </div>
);

export default Breadcrumbs;
