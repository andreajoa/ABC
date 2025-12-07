# Shopify Headless Store Setup Guide

## Connecting Your Vercel Deployment to Shopify Store

Since your domain is already connected to your Shopify store, you have two options to connect your headless Hydrogen store:

### Option 1: App Proxy (Recommended for Subdirectory)

If you want to serve your headless store at a path like `yourstore.com/pages` or `yourstore.com/shop`:

1. **In Shopify Admin:**
   - Go to **Settings > Apps and sales channels**
   - Click **Develop apps** (or use an existing app)
   - Create/Select your app
   - Go to **Configuration > App proxy**
   - Add a new proxy:
     - **Subpath prefix:** `pages` (or `shop`, `store`, etc.)
     - **Subpath:** `*` (wildcard to catch all paths)
     - **Proxy URL:** `https://your-vercel-app.vercel.app`
     - **Proxy type:** `Standard`

2. **In Your Hydrogen App:**
   - The app will receive requests at `/pages/*` from Shopify
   - Handle the proxy requests in your routes

### Option 2: Subdomain (Recommended for Full Headless)

If you want to use a subdomain like `shop.yourstore.com` or `store.yourstore.com`:

1. **In Vercel:**
   - Go to your project **Settings > Domains**
   - Add your subdomain (e.g., `shop.yourstore.com`)
   - Follow DNS instructions to add CNAME record

2. **In Shopify Admin:**
   - Go to **Online Store > Domains**
   - The main domain stays with Shopify
   - Your subdomain points to Vercel

### Option 3: Custom Domain Path (Using Shopify's Online Store)

1. **In Shopify Admin:**
   - Go to **Online Store > Navigation**
   - Add a link to your Vercel deployment URL
   - Or use **Online Store > Pages** and embed your Hydrogen app

## Environment Variables for Vercel

Add these in **Vercel Dashboard > Project Settings > Environment Variables**:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_token
SESSION_SECRET=your_random_secret_string
PUBLIC_STORE_URL=https://your-vercel-app.vercel.app
```

### Getting Your Storefront API Token:

1. Go to **Shopify Admin > Settings > Apps and sales channels**
2. Click **Develop apps**
3. Create a new app or use existing
4. Go to **Configuration > Storefront API**
5. Enable **Storefront API access**
6. Copy the **Storefront API access token**

## Testing the Connection

After deployment:

1. Visit your Vercel URL
2. Check that products load from Shopify
3. Test navigation and product pages
4. Verify collections display correctly

## Troubleshooting

- **Products not loading:** Check Storefront API token permissions
- **CORS errors:** Ensure `PUBLIC_STORE_URL` matches your Vercel domain
- **404 errors:** Check that routes are properly configured
- **Build failures:** Verify all environment variables are set in Vercel

