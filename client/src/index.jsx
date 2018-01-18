import App from './screens/App.jsx';
import backend from './state/backend';
import React from 'react';
import ReactDom from 'react-dom';
import { setup } from 'wolkenkit-ux';

setup.client();

/* eslint-disable no-process-env */
const host = process.env.API_HOST || 'local.wolkenkit.io',
      port = process.env.API_PORT || 3000;

const clientId = process.env.AUTH_CLIENT_ID || 'jBA1TFVpyhi37Z38i7l0hdAc3rPKpka9',
      identityProviderUrl = process.env.AUTH_IDENTITY_PROVIDER_URL || 'https://thenativeweb.eu.auth0.com/authorize';
/* eslint-enable no-process-env */

(async () => {
  if (!backend.state.isConnected) {
    await backend.connect({
      host,
      port,
      authentication: {
        identityProviderUrl,
        clientId,
        scope: 'profile',
        strictMode: false
      }
    });

    ReactDom.render(<App />, document.querySelector('.Shell'));
  }
})();
