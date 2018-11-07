import DepotClient from 'wolkenkit-depot-client';
import state from '../state';

let depotClient;

const getDepotClient = function ({ host, port }) {
  if (!host) {
    throw new Error('Host is missing.');
  }
  if (!port) {
    throw new Error('Port is missing.');
  }

  const api = state.api;

  if (!api) {
    throw new Error('Not connected to backend.');
  }

  const token = api.auth.getToken();

  if (!depotClient) {
    depotClient = new DepotClient({
      host,
      port,
      token
    });
  }

  return depotClient;
};

export default getDepotClient;
