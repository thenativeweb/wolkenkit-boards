import state from './state';
import wolkenkit from 'wolkenkit-client';
import { extendObservable, runInAction } from 'mobx';

const connect = async function ({ host, port, authentication }) {
  if (host === undefined) {
    throw new Error('Host is missing.');
  }
  if (port === undefined) {
    throw new Error('Port is missing.');
  }

  let api;

  try {
    api = await wolkenkit.connect({ host, port, authentication: new wolkenkit.authentication.OpenIdConnect(authentication) });
  } catch (ex) {
    state.error = 'Lost connection to the backend.';
    state.isConnected = false;

    return;
  }

  if (!api.auth.isLoggedIn()) {
    return api.auth.login();
  }

  runInAction(() => {
    extendObservable(state, {
      api,
      host,
      port,
      error: undefined,
      isConnected: true,
      user: api.auth.getProfile()
    });
  });

  api.on('disconnected', () => {
    state.isConnected = false;
    state.error = 'Lost connection to the backend.';
  });
};

export default connect;
