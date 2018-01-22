import ActivBoardScreen from './activeBoard/ActivBoardScreen.jsx';
import backend from '../state/backend';
import BoardHeader from './activeBoard/BoardHeader.jsx';
import BoardsScreen from './boards/BoardsScreen.jsx';
import MainMenu from './MainMenu.jsx';
import { Overlays } from '../components/overlay';
import React from 'react';
import styles from './App.css';
import { AppBar, Breadcrumbs, Button, Confirm, ContextMenu, Dialog, Form, Symbols } from '../components';
import { HashRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <HashRouter>
    <div className={ styles.App }>
      <Symbols />
      <AppBar>
        <MainMenu />
        <Breadcrumbs>
          <Route exact={ true } path='/board/:slug' component={ BoardHeader } />
        </Breadcrumbs>
      </AppBar>
      <Switch>
        <Route exact={ true } location={ location } path='/' component={ BoardsScreen } />
        <Route exact={ true } location={ location } path='/boards' component={ BoardsScreen } />
        <Route exact={ true } location={ location } path='/board/:slug' component={ ActivBoardScreen } />
      </Switch>
      <ContextMenu />
      <Overlays />
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
