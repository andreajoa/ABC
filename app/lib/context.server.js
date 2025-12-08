import {createStorefrontClient} from './shopify.server';
import {createWithCache, CacheLong} from '@shopify/hydrogen';

/**
 * Create the Remix context with Shopify integration
 */
export async function createContext(request, env, executionContext) {
  const waitUntil = executionContext?.waitUntil || (() => {});
  const cache = await caches.open('hydrogen');

  const storefront = createStorefrontClient({
    request,
    cache,
    waitUntil,
  });

  return {
    storefront,
    env,
  };
}
