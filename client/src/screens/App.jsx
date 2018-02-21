import ActiveBoardScreen from './activeBoard/ActiveBoardScreen.jsx';
import backend from '../state/backend';
import BoardHeader from './activeBoard/BoardHeader.jsx';
import BoardsScreen from './boards/BoardsScreen.jsx';
import Menu from './menu/Menu.jsx';
import React from 'react';
import styles from './App.css';
import { AppBar, Breadcrumbs, Button, Confirm, ContextMenu, Dialog, Form, Notifications, Symbols } from '../components';
import { HashRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <HashRouter>
    <div className={ styles.App }>
      <Symbols />
      <AppBar>
        <Menu />
        <Breadcrumbs>
          <Route exact={ true } path='/board/:slug' component={ BoardHeader } />
        </Breadcrumbs>
      </AppBar>
      <Switch>
        <Route exact={ true } location={ location } path='/' component={ BoardsScreen } />
        <Route exact={ true } location={ location } path='/boards' component={ BoardsScreen } />
        <Route exact={ true } location={ location } path='/board/:slug' component={ ActiveBoardScreen } />
      </Switch>
      <ContextMenu />
      <Notifications />
      <Confirm />
      <Dialog isVisible={ !backend.state.isConnected }>
        <Form.Row type='message'>
          { backend.state.error }
        </Form.Row>
        <Form.Row type='action-buttons'>
          <Button
            className='primary'
            onClick={ () => backend.reconnect() }
          >
            Reconnect me!
          </Button>
        </Form.Row>
      </Dialog>
    </div>
  </HashRouter>
);

export default App;
