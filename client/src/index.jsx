import App from './screens/App.jsx';
import React from 'react';
import ReactDom from 'react-dom';
import services from './services';
import { setup } from 'wolkenkit-ux';
import wolkenkit from 'wolkenkit-client';

setup.client();

/* eslint-disable no-process-env */
const host = process.env.API_HOST || 'local.wolkenkit.io',
      port = process.env.API_PORT || 3000;

const clientId = process.env.AUTH_CLIENT_ID || 'jBA1TFVpyhi37Z38i7l0hdAc3rPKpka9',
      identityProviderUrl = process.env.AUTH_IDENTITY_PROVIDER_URL || 'https://thenativeweb.eu.auth0.com/authorize';
/* eslint-enable no-process-env */

wolkenkit.connect({
  host,
  port,
  authentication: new wolkenkit.authentication.OpenIdConnect({
    identityProviderUrl,
    clientId,
    scope: 'profile',
    strictMode: false
  })
}).
  then(boardsApi => {
    if (!boardsApi.auth.isLoggedIn()) {
      return boardsApi.auth.login();
    }

    services.boardsApi = boardsApi;
    ReactDom.render(<App />, document.querySelector('.Shell'));
  }).
  catch(err => {
    throw err;
  });
