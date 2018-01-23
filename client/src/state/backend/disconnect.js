import state from './state';

const disconnect = async function () {
  const api = state.api;

  if (!api) {
    throw new Error('Not connected to backend.');
  }

  api.auth.logout();

  window.location.reload();
};

export default disconnect;
