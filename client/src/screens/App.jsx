import ActiveBoardScreen from './activeBoard/ActiveBoardScreen.jsx';
import backend from '../state/backend';
import BoardHeader from './activeBoard/BoardHeader.jsx';
import BoardsScreen from './boards/BoardsScreen.jsx';
import Dialogs from '../components/Dialogs';
import Menu from './menu/Menu.jsx';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './App.css';
import { AppBar, Breadcrumbs, Button, ContextMenu, Form, Headline, Modal, Notifications, Symbols } from '../components';
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
      <Dialogs />
      <Modal isVisible={ !backend.state.isConnected }>
        <Headline>
          Disconnected
        </Headline>
        <Form.Row>
          { backend.state.error }
        </Form.Row>
        <Form.Row type='action-buttons'>
          <Button
            isPrimary={ true }
            onClick={ () => backend.reconnect() }
          >
            Reconnect me!
          </Button>
        </Form.Row>
      </Modal>
    </div>
  </HashRouter>
);

export default observer(App);
