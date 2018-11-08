import DepotClient from 'wolkenkit-depot-client';
import state from '../state';

const cache = {};

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

  const cacheKey = `${host}:${port}:${token}`;

  if (!cache[cacheKey]) {
    cache[cacheKey] = new DepotClient({
      host,
      port,
      token
    });
  }

  return cache[cacheKey];
};

export default getDepotClient;
