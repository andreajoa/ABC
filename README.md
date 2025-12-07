# Vastara Luxury Watch Store

A headless Shopify Hydrogen store built with Remix, featuring a luxury watch e-commerce experience.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Shopify store with Storefront API access
- Shopify CLI (optional, for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andreajoa/ABC.git
   cd Watch-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_token_here
   SHOPIFY_ADMIN_API_TOKEN=your_admin_token_here
   SESSION_SECRET=your_session_secret_here
   PUBLIC_STORE_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
Watch-store/
├── app/
│   ├── routes/
│   │   ├── _index.jsx              # Home page
│   │   ├── collections.$handle.jsx # Collections page
│   │   └── products.$handle.jsx    # Product page
│   ├── components/
│   │   └── layout/
│   │       ├── Header.jsx          # Global header
│   │       └── Footer.jsx          # Global footer
│   ├── lib/
│   │   ├── shopify.server.js       # Shopify client setup
│   │   ├── queries.js              # GraphQL queries
│   │   ├── utils.js                # Utility functions
│   │   └── context.server.js       # Remix context setup
│   ├── styles/
│   │   └── app.css                 # Global styles + Tailwind
│   ├── entry.client.tsx            # Client entry point
│   ├── entry.server.tsx             # Server entry point
│   └── root.jsx                    # Root layout
├── public/                         # Static assets
├── package.json
├── remix.config.js
├── tailwind.config.js
├── vercel.json                     # Vercel deployment config
└── README.md
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Type check TypeScript files
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🚀 Deployment

### Vercel Deployment

1. **Connect GitHub to Vercel**
   - Import project from GitHub
   - Vercel will auto-detect Remix framework

2. **Add Environment Variables**
   - Navigate to Project Settings > Environment Variables
   - Add all Shopify credentials:
     - `SHOPIFY_STORE_DOMAIN`
     - `SHOPIFY_STOREFRONT_API_TOKEN`
     - `SHOPIFY_ADMIN_API_TOKEN` (optional)
     - `SESSION_SECRET`
     - `PUBLIC_STORE_URL`

3. **Deploy**
   - Push to main branch or use Vercel CLI:
     ```bash
     vercel --prod
     ```

### Custom Domain

1. In Vercel: Settings > Domains > Add Domain
2. Add your Shopify store domain or subdomain
3. Update DNS records as instructed

## 🔌 Shopify Integration

### Storefront API Setup

1. Go to your Shopify Admin
2. Navigate to Apps > Develop apps
3. Create a new app or use existing
4. Enable Storefront API access
5. Copy the Storefront API access token
6. Add to environment variables

### Required Shopify Permissions

- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_read_collection_listings`
- `unauthenticated_read_checkouts`

## 📦 Features

- ✅ Home page with hero, collections, and featured products
- ✅ Collections page with filtering and sorting
- ✅ Product page with variants and recommendations
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with meta tags and structured data
- ✅ Performance optimized
- ✅ Tailwind CSS styling
- ✅ Shopify Storefront API integration

## 🎨 Design System

### Colors
- Forest Green: `#0a3d2f`, `#1a5757`
- Luxury Gold: `#d4af69`, `#b87333`
- Cream: `#fefdf8`
- Neutral: `#2a2a2a`, `#9d8b7c`

### Fonts
- Headings: 'Cormorant Garamond', serif
- Body: 'Inter', sans-serif
- Display: 'Playfair Display', serif

## 📝 Notes

- The project uses Remix 2.x with Vite
- Shopify Hydrogen React for Storefront API
- Tailwind CSS for styling
- Lucide React for icons

## 🤝 Support

For issues or questions, please contact support@vastara.online

## 📄 License

Copyright © 2024 Vastara. All rights reserved.

