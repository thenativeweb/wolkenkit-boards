import state from './state';

const disconnect = async function () {
  const api = state.api;

  if (!api) {
    throw new Error('Not connected to backend.');
  }

  api.auth.logout();

  const { hostname, port, protocol } = window.location;

  window.location.href = `https://auth.thenativeweb.io/auth/realms/porsche/protocol/openid-connect/logout?redirect_uri=${protocol}//${hostname}${port ? `:${port}` : ''}`;
};

export default disconnect;
