import {createRequestHandler} from '@remix-run/server-runtime';

export default {
  async fetch(request, env, context) {
    const remixHandler = createRequestHandler({
      build: await import('./build/server'),
      mode: process.env.NODE_ENV,
    });
    return remixHandler(request);
  },
};
