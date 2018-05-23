import ActiveBoardScreen from './activeBoard/ActiveBoardScreen.jsx';
import backend from '../state/backend';
import BoardHeader from './activeBoard/BoardHeader.jsx';
import BoardsScreen from './boards/BoardsScreen.jsx';
import Menu from './menu/Menu.jsx';
import { observer } from 'mobx-react';
import React from 'react';
import theme from '../theme/boards';
import { AppBar, Breadcrumbs, ContextMenu, Symbols } from '../components';
import { Application, Button, Headline, Message, Modal, ThemeProvider } from 'thenativeweb-ux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

const App = () => (
  <ThemeProvider theme={ theme }>
    <HashRouter>
      <Application orientation='vertical'>
        <Application.Services />
        <Symbols />
{/* {        <Sidebar>
          <Sidebar.Item>

          </Sidebar.Item>
        </Sidebar>} */}
        <AppBar>
          <Menu />
          <Breadcrumbs>
            <Route exact={ true } path='/board/:slug' component={ BoardHeader } />
          </Breadcrumbs>
        </AppBar>
        <Switch>
          <Route exact={ true } location={ location } path='/' component={ BoardsScreen } />
          <Route exact={ true } location={ location } path='/board/:slug' component={ ActiveBoardScreen } />
          <Redirect to='/' />
        </Switch>
        <ContextMenu />
        <Modal isVisible={ !backend.state.isConnected }>
          <Headline>
            Disconnected
          </Headline>
          <Message type='error'>
            { backend.state.error }
          </Message>
          <Button
            isPrimary={ true }
            onClick={ () => backend.reconnect() }
          >
            Reconnect me!
          </Button>
        </Modal>
      </Application>
    </HashRouter>
  </ThemeProvider>
);

export default observer(App);
