import {createContext} from './lib/context.server';

export async function getLoadContext(request) {
  return await createContext(request);
}
