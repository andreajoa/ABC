import {createStorefrontClient} from './shopify.server';

/**
 * Create the Remix context with Shopify integration
 */
export async function createContext(request) {
  const storefront = createStorefrontClient({
    request,
  });

  return {
    storefront,
    env: {
      SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
      PUBLIC_STORE_URL: process.env.PUBLIC_STORE_URL,
    },
  };
}
