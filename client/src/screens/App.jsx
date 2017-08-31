import BoardHeader from './board/BoardHeader.jsx';
import BoardScreen from './board/BoardScreen.jsx';
import BoardsScreen from './boards/BoardsScreen.jsx';
import MainMenu from './MainMenu.jsx';
import { Overlays } from '../components/overlay';
import React from 'react';
import services from '../services';
import styles from './App.css';
import { AppBar, Breadcrumbs, Button, Confirm, ContextMenu, Dialog, Form, Symbols } from '../components';
import { HashRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  static handleReconnectClicked () {
    process.nextTick(() => {
      window.location.reload();
    });
  }

  constructor (props) {
    super(props);

    this.state = {
      isConnected: true
    };
  }

  componentWillMount () {
    const { boardsApi } = services;

    boardsApi.on('error', err => {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    });

    boardsApi.on('disconnected', () => {
      this.setState({ isConnected: false });
    });
  }

  render () {
    return (
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
            <Route exact={ true } location={ location } path='/board/:slug' component={ BoardScreen } />
          </Switch>
          <ContextMenu />
          <Overlays />
          <Confirm />
          <Dialog isVisible={ !this.state.isConnected }>
            <Form.Row type='message'>
              Damn it! We&#x27;ve been disconnected from our backend server!
            </Form.Row>
            <Form.Row type='action-buttons'>
              <Button
                className='primary'
                onClick={ App.handleReconnectClicked }
              >
                Reconnect me!
              </Button>
            </Form.Row>
          </Dialog>
        </div>
      </HashRouter>
    );
  }
}

export default App;
