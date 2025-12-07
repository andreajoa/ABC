import {createRequestHandler} from '@remix-run/vercel';
import * as build from '@remix-run/dev/server-build';
import {createContext} from '../app/lib/context.server';

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: async (request) => {
    return await createContext(request);
  },
});

