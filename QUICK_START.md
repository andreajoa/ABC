# 🚀 Quick Start Guide - Vastara Store Deployment

## Your Shopify Credentials

⚠️ **IMPORTANT:** Never commit actual credentials to GitHub! Use the values below in Vercel environment variables only.

- **Store Domain:** `kp0zf4-m0.myshopify.com` (use this in Vercel)
- **Storefront API Token:** Use your Storefront API token (see VERCEL_ENV_SETUP.md)
- **Admin API Token:** Use your Admin API token if needed (for future use)

## ✅ Do You Need Shopify CLI or Hydrogen CLI?

### **For Vercel Deployment: NO CLI NEEDED** ✅

You **DO NOT** need to use Shopify CLI or Hydrogen CLI for deployment. Just:
1. Set environment variables in Vercel (see below)
2. Deploy
3. Done!

### **For Local Testing (Optional):**

If you want to test locally before deploying:

**Option 1: Simple (Recommended)**
```bash
# Create .env file with your credentials
# Then run:
npm install
npm run dev
```

**Option 2: With Shopify CLI (Advanced)**
```bash
# If you have Shopify CLI installed:
shopify hydrogen dev
```

But this is **optional** - you can deploy directly to Vercel without local testing.

## 📋 Vercel Deployment Steps

### Step 1: Add Environment Variables in Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **4 variables**:

| Key | Value | Environments |
|-----|-------|--------------|
| `SHOPIFY_STORE_DOMAIN` | `kp0zf4-m0.myshopify.com` | All (Production, Preview, Development) |
| `SHOPIFY_STOREFRONT_API_TOKEN` | `ab6268dc8176eddfee762646b4314689` | All |
| `SESSION_SECRET` | `7iuZWUnmqZZHR+Gq7gKkSsDlb3dNSf5ei7DN5zVQXIQ=` | All |
| `PUBLIC_STORE_URL` | `https://your-app.vercel.app` | All |

⚠️ **Important:** After first deployment, update `PUBLIC_STORE_URL` with your actual Vercel URL!

### Step 2: Deploy

1. Click **Deploy** in Vercel
2. Wait for build to complete
3. Copy your deployment URL
4. Update `PUBLIC_STORE_URL` with the new URL
5. Redeploy

### Step 3: Connect to Your Shopify Domain

Since your domain `kp0zf4-m0.myshopify.com` is connected to Shopify, you have options:

**Option A: Use App Proxy (Subdirectory)**
- Serve at: `yourstore.com/pages` or `yourstore.com/shop`
- See `SHOPIFY_SETUP.md` for details

**Option B: Use Subdomain**
- Serve at: `shop.yourstore.com` or `store.yourstore.com`
- Add subdomain in Vercel → Settings → Domains

## 🧪 Test Your Deployment

After deployment, visit your Vercel URL and check:
- ✅ Home page loads
- ✅ Collections display
- ✅ Products show from Shopify
- ✅ Product pages work
- ✅ Images load correctly

## 🔧 Troubleshooting

**Build fails?**
- Check all 4 environment variables are set
- Verify token is correct
- Check Vercel build logs

**Products not loading?**
- Verify `SHOPIFY_STOREFRONT_API_TOKEN` is correct
- Check `SHOPIFY_STORE_DOMAIN` matches exactly
- Ensure Storefront API is enabled in Shopify

**CORS errors?**
- Update `PUBLIC_STORE_URL` to match your Vercel domain
- Redeploy after updating

## 📞 Need Help?

Check the detailed guides:
- `VERCEL_ENV_SETUP.md` - Environment variables setup
- `SHOPIFY_SETUP.md` - Shopify domain integration
- `README.md` - Full project documentation

