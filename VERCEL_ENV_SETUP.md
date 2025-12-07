# Vercel Environment Variables Setup

## Quick Setup for Your Store

Use these exact values in **Vercel Dashboard > Project Settings > Environment Variables**:

### Required Variables:

1. **SHOPIFY_STORE_DOMAIN**
   ```
   kp0zf4-m0.myshopify.com
   ```
   (Your store domain - use the one provided)

2. **SHOPIFY_STOREFRONT_API_TOKEN**
   ```
   [Use your Storefront API token - provided separately]
   ```
   (Your Storefront API token - use the one provided)

3. **SESSION_SECRET**
   ```
   [Generate a random string - see command below]
   ```
   Generate with: `openssl rand -base64 32`
   Or use: `vastara_session_secret_2024_secure_key_random_12345`

4. **PUBLIC_STORE_URL**
   ```
   https://your-vercel-app.vercel.app
   ```
   ⚠️ **Update this after first deployment** with your actual Vercel URL

### Generate SESSION_SECRET:

Run this command locally or use an online generator:
```bash
openssl rand -base64 32
```

Or use this random string:
```
vastara_session_secret_2024_secure_key_random_12345
```

## Step-by-Step in Vercel:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Click **Add New**
   - Enter the **Key** (e.g., `SHOPIFY_STORE_DOMAIN`)
   - Enter the **Value** (e.g., `kp0zf4-m0.myshopify.com`)
   - Select environments: **Production**, **Preview**, **Development**
   - Click **Save**
4. Repeat for all 4 variables
5. **Redeploy** your project

## After First Deployment:

1. Copy your Vercel deployment URL (e.g., `abc-xyz123.vercel.app`)
2. Update `PUBLIC_STORE_URL` in Vercel environment variables
3. Redeploy

## Local Development (Optional):

If you want to test locally, create a `.env` file in the project root:

```env
SHOPIFY_STORE_DOMAIN=kp0zf4-m0.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=[your_storefront_token]
SESSION_SECRET=[your_random_secret]
PUBLIC_STORE_URL=http://localhost:3000
```

Then run:
```bash
npm install
npm run dev
```

## Do You Need Shopify CLI?

**For Vercel Deployment: NO** ✅
- Just set environment variables in Vercel
- No CLI needed for deployment

**For Local Development: Optional** ⚙️
- Shopify CLI can help with:
  - Testing locally with real Shopify data
  - Running `shopify hydrogen dev` for development
  - But you can also just use `npm run dev` with `.env` file

**For Hydrogen CLI: Not Required** ❌
- Hydrogen is already installed as a dependency
- No separate CLI installation needed

