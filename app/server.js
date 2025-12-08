import {createContext} from './lib/context.server';

export async function getLoadContext(request, context) {
  return await createContext(request, context?.env, context);
}
