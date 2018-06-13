import AboutDialog from './AboutDialog';
import aboutDialog from '../state/aboutDialog';
import ActiveBoard from './ActiveBoard';
import ActiveBoardHeader from './ActiveBoard/Header';
import backend from '../state/backend';
import Boards from './Boards';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import Menu from './Menu';
import menu from '../state/menu';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './styles';
import theme from '../theme/boards';
import { AppBar, Breadcrumbs, ContextMenu, Symbols } from '../components';
import { Application, Brand, Button, Headline, Link, Message, Modal, Sidebar, ThemeProvider, View } from 'thenativeweb-ux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

const App = ({ classes }) => (
  <ThemeProvider theme={ theme }>
    <HashRouter>
      <Application orientation='horizontal'>
        <Application.Services />
        <Symbols />
        <Sidebar>
          <Sidebar.Brand><Brand.Product name='boards' /></Sidebar.Brand>
          <Sidebar.Item iconName='menu' className={ classNames({ [classes.SidebarItemDisabled]: !menu.isEnabled() }) } onClick={ () => menu.expand() } />
          <Sidebar.Item className={ classes.UserAvatar } iconUrl={ backend.state.user.picture }>
            <Sidebar.Item>You are logged in as { backend.state.user.nickname }</Sidebar.Item>
            <Sidebar.Item onClick={ () => backend.disconnect() }>Logout</Sidebar.Item>
          </Sidebar.Item>
          <Sidebar.Item iconName='help' onClick={ () => aboutDialog.show() } />
          <Sidebar.Footer>
            <Link href='https://www.thenativeweb.io' isExternal={ true }>
              <Brand type='minimal' color='monochrome' isInteractive={ true } />
            </Link>
          </Sidebar.Footer>
        </Sidebar>
        <Menu />
        <View adjust='flex' scrollable='auto'>
          <AppBar>
            <Menu />
            <Breadcrumbs>
              <Route exact={ true } path='/board/:slug' component={ ActiveBoardHeader } />
            </Breadcrumbs>
          </AppBar>
          <Switch>
            <Route exact={ true } location={ location } path='/' component={ Boards } />
            <Route exact={ true } location={ location } path='/board/:slug' component={ ActiveBoard } />
            <Redirect to='/' />
          </Switch>
        </View>
        <ContextMenu />
        <AboutDialog />
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

export default injectSheet(styles)(observer(App));
