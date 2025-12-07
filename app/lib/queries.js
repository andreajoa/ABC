/**
 * GraphQL Queries for Shopify Storefront API
 */

// Collections Query
export const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 8, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
          width
          height
        }
        products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

// Featured Products Query
export const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        vendor
        description
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        availableForSale
      }
    }
  }
`;

// Collection Query with Products
export const COLLECTION_QUERY = `#graphql
  fragment ProductCard on Product {
    id
    title
    handle
    vendor
    description
    availableForSale
    productType
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 2) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }

  query Collection(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

// Product Query
export const PRODUCT_QUERY = `#graphql
  fragment ProductDetails on Product {
    id
    title
    handle
    vendor
    description
    descriptionHtml
    availableForSale
    seo {
      description
      title
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    media(first: 10) {
      nodes {
        ... on MediaImage {
          id
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    variants(first: 100) {
      nodes {
        id
        title
        availableForSale
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
    metafields(identifiers: [
      {namespace: "custom", key: "specifications"},
      {namespace: "custom", key: "features"}
    ]) {
      id
      namespace
      key
      value
    }
  }

  query Product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle, selectedOptions: $selectedOptions) {
      ...ProductDetails
    }
  }
`;

// Recommended Products Query
export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      vendor
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;

