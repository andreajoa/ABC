import {createStorefrontClient as createHydrogenStorefrontClient} from '@shopify/hydrogen-react';
import {createCustomerAccountClient} from '@shopify/hydrogen-react/customer-account';

/**
 * Create Shopify Storefront API client
 */
export function createStorefrontClient({
  request,
  response,
  cache,
}) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  if (!storeDomain || !storefrontAccessToken) {
    throw new Error(
      'Missing required Shopify environment variables: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN'
    );
  }

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

/**
 * Create Customer Account API client (optional)
 */
export function createCustomerAccountClient() {
  const customerAccountClientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;
  const customerAccountUrl = process.env.SHOPIFY_CUSTOMER_ACCOUNT_URL;

  if (!customerAccountClientId || !customerAccountUrl) {
    return null;
  }

  return createCustomerAccountClient({
    customerAccountId: customerAccountClientId,
    customerAccountUrl,
  });
}

