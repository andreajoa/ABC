import {createStorefrontClient as createHydrogenClient} from '@shopify/hydrogen';

/**
 * Create Shopify Storefront API client
 */
export function createStorefrontClient({request}) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  if (!storeDomain || !storefrontAccessToken) {
    throw new Error(
      'Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_API_TOKEN environment variables'
    );
  }

  return createHydrogenClient({
    storeDomain,
    publicStorefrontToken: storefrontAccessToken,
    privateStorefrontToken: storefrontAccessToken,
    storefrontApiVersion: '2024-10',
    i18n: {language: 'EN', country: 'US'},
  });
}
