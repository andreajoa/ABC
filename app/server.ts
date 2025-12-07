import type {AppLoadContext} from '@remix-run/node';
import {createContext} from './lib/context.server';

export async function getLoadContext(
  request: Request
): Promise<AppLoadContext> {
  return await createContext(request);
}

