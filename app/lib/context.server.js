import {createStorefrontClient} from './shopify.server';
import {createCache} from '@shopify/hydrogen-react';

/**
 * Create the Remix context with Shopify integration
 */
export async function createContext(request) {
  const cache = createCache({
    type: 'memory',
  });

  const storefront = createStorefrontClient({
    request,
    response: new Response(),
    cache,
  });

  return {
    storefront,
    cache,
  };
}

