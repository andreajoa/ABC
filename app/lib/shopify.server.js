import {createStorefrontClient as createHydrogenStorefrontClient} from '@shopify/hydrogen-react';
import {createCache} from '@shopify/hydrogen-react';

/**
 * Create Shopify Storefront API client
 */
export function createStorefrontClient({request}) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  if (!storeDomain || !storefrontAccessToken) {
    console.error('Missing Shopify environment variables:', {
      hasDomain: !!storeDomain,
      hasToken: !!storefrontAccessToken,
    });
    throw new Error(
      'Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_API_TOKEN environment variables'
    );
  }

  const cache = createCache({
    type: 'memory',
  });

  return createHydrogenStorefrontClient({
    storeDomain,
    storefrontAccessToken,
    apiVersion: '2024-10',
    publicStorefrontToken: storefrontAccessToken,
    requestGroupId: request.headers.get('request-id'),
    cache,
    i18n: {
      language: 'EN',
      country: 'US',
    },
  });
}
