// app/routes/products.$handle.jsx
import {useLoaderData, Link} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import {Await, useRouteLoaderData} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Shield,
  Package,
  RotateCcw,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Minus,
  Plus,
  TrendingUp,
  Eye,
  Clock,
  Zap,
} from 'lucide-react';

/**
 * SEO Meta Tags
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  if (!data?.product) {
    return [{title: 'Product Not Found | Vastara'}];
  }

  const {product} = data;
  const price = product.selectedOrFirstAvailableVariant?.price;
  const comparePrice = product.selectedOrFirstAvailableVariant?.compareAtPrice;
  
  return [
    {title: `${product.title} | Vastara Luxury Watches`},
    {name: 'description', content: product.seo?.description || product.description?.substring(0, 155)},
    {name: 'keywords', content: `luxury watch, ${product.title}, automatic watch, premium timepiece, Vastara`},
    
    // Open Graph
    {property: 'og:title', content: product.title},
    {property: 'og:description', content: product.description?.substring(0, 200)},
    {property: 'og:image', content: product.selectedOrFirstAvailableVariant?.image?.url},
    {property: 'og:type', content: 'product'},
    {property: 'og:price:amount', content: price?.amount},
    {property: 'og:price:currency', content: price?.currencyCode},
    {property: 'og:availability', content: product.availableForSale ? 'in stock' : 'out of stock'},
    
    // Twitter Card
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: product.title},
    {name: 'twitter:description', content: product.description?.substring(0, 200)},
    {name: 'twitter:image', content: product.selectedOrFirstAvailableVariant?.image?.url},
    
    // Canonical
    {tagName: 'link', rel: 'canonical', href: `https://vastara.online/products/${product.handle}`},
    
    // Schema.org JSON-LD
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.selectedOrFirstAvailableVariant?.image?.url,
        brand: {
          '@type': 'Brand',
          name: product.vendor || 'Vastara',
        },
        offers: {
          '@type': 'Offer',
          price: price?.amount,
          priceCurrency: price?.currencyCode,
          availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: `https://vastara.online/products/${product.handle}`,
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '127',
        },
      },
    },
  ];
};

/**
 * Loader - Fetch product data
 */
export async function loader({params, context, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Expected product handle', {status: 404});
  }

  const selectedOptions = getSelectedProductOptions(request);

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions},
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Get recommended products
  const {productRecommendations} = await storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
    {
      variables: {productId: product.id},
    },
  );

  return defer({
    product,
    recommendedProducts: productRecommendations || [],
  });
}

// Luxury trust badges
const trustBadges = [
  {icon: Shield, label: 'Authenticity Guaranteed', subtitle: 'Certificate included'},
  {icon: Package, label: 'Premium Gift Box', subtitle: 'Luxury packaging'},
  {icon: RotateCcw, label: '60-Day Returns', subtitle: 'Risk-free purchase'},
  {icon: Award, label: '5-Year Warranty', subtitle: 'Global coverage'},
];

export default function Product() {
  const {product, recommendedProducts} = useLoaderData();

  // Hydrogen optimistic variant selection
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Get images
  const productImages = product.media?.nodes || product.images?.edges?.map(({node}) => node) || [];
  const currentImage = productImages[selectedImage] || selectedVariant?.image;

  // Parse metafields
  const getMetafield = (key) => {
    const metafield = product.metafields?.find((m) => m.key === key);
    try {
      return metafield?.value ? JSON.parse(metafield.value) : null;
    } catch {
      return metafield?.value || null;
    }
  };

  const specifications = getMetafield('specifications') || {
    'Case Diameter': '42mm',
    'Movement': 'Automatic',
    'Water Resistance': '100m',
    'Case Material': '316L Stainless Steel',
    'Crystal': 'Sapphire',
    'Band Material': 'Stainless Steel',
    'Clasp Type': 'Deployment',
    'Power Reserve': '42 hours',
  };

  const features = getMetafield('features') || [
    'Swiss-Inspired Automatic Movement',
    'Sapphire Crystal Glass',
    'Screw-Down Crown',
    'Luminous Hands & Markers',
    '100M Water Resistance',
    'Premium Gift Packaging',
  ];

  // Calculate savings
  const price = parseFloat(selectedVariant?.price?.amount || 0);
  const comparePrice = parseFloat(selectedVariant?.compareAtPrice?.amount || 0);
  const savings = comparePrice > price ? comparePrice - price : 0;
  const savingsPercent = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  // Social proof data
  const viewersNow = Math.floor(Math.random() * 20) + 15;
  const purchasedToday = Math.floor(Math.random() * 8) + 5;

  return (
    <div className="min-h-screen bg-[#fefdf8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-heading {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(212, 175, 105, 0.3), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .gradient-gold {
          background: linear-gradient(135deg, #d4af69 0%, #b87333 100%);
        }
        
        .gradient-forest {
          background: linear-gradient(135deg, #0a3d2f 0%, #1a5757 100%);
        }
      `}</style>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-[#9d8b7c]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#2a2a2a]/60 hover:text-[#0a3d2f] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-[#9d8b7c]" />
            <Link to="/collections/watches" className="text-[#2a2a2a]/60 hover:text-[#0a3d2f] transition-colors">
              Luxury Watches
            </Link>
            <ChevronRight size={14} className="text-[#9d8b7c]" />
            <span className="text-[#0a3d2f] font-medium">{product.title}</span>
          </div>
        </div>
      </nav>

      {/* Social Proof Banner */}
      <div className="bg-gradient-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-[#d4af69]" />
              <span><strong>{viewersNow}</strong> people viewing now</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#d4af69]" />
              <span><strong>{purchasedToday}</strong> sold today</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#d4af69]" />
              <span>Limited Edition</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Gallery */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#9d8b7c]/10">
                <img
                  src={currentImage?.url}
                  alt={currentImage?.altText || product.title}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setShowGalleryModal(true)}
                />
                
                {/* Sale Badge */}
                {savings > 0 && (
                  <div className="absolute top-6 right-6">
                    <div className="gradient-gold text-white px-4 py-2 rounded-full shadow-lg">
                      <div className="text-xs font-semibold">SAVE ${savings.toFixed(0)}</div>
                      <div className="text-lg font-bold leading-none">{savingsPercent}% OFF</div>
                    </div>
                  </div>
                )}

                {/* Limited Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-[#0a3d2f] text-[#d4af69] px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Sparkles size={16} />
                    <span className="text-sm font-semibold">Limited Edition</span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((selectedImage - 1 + productImages.length) % productImages.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={24} className="text-[#0a3d2f]" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((selectedImage + 1) % productImages.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={24} className="text-[#0a3d2f]" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-6 gap-3">
                {productImages.slice(0, 6).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-[#d4af69] shadow-lg scale-105'
                        : 'border-[#9d8b7c]/20 hover:border-[#d4af69]/50'
                    }`}
                  >
                    <img
                      src={img.url || img.image?.url}
                      alt={img.altText || `View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-4 bg-white rounded-2xl p-6 shadow-lg border border-[#9d8b7c]/10">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="gradient-gold p-2.5 rounded-lg">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a3d2f]">{badge.label}</div>
                      <div className="text-sm text-[#2a2a2a]/60">{badge.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brand & Title */}
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-[#d4af69] uppercase text-sm font-semibold tracking-wider">
                  {product.vendor || 'VASTARA'}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#d4af69] text-[#d4af69]" />
                  ))}
                  <span className="text-sm text-[#2a2a2a]/60 ml-2">4.8 (127 reviews)</span>
                </div>
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#0a3d2f] leading-tight mb-4">
                {product.title}
              </h1>
              <p className="text-[#2a2a2a]/70 leading-relaxed">
                {product.description?.substring(0, 150)}...
              </p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-[#0a3d2f] to-[#1a5757] rounded-2xl p-6 text-white">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="font-heading text-5xl font-bold text-[#d4af69]">
                  {selectedVariant?.price?.currencyCode} ${price.toFixed(2)}
                </span>
                {comparePrice > price && (
                  <>
                    <span className="text-2xl text-white/50 line-through">
                      ${comparePrice.toFixed(2)}
                    </span>
                    <span className="bg-[#d4af69] text-[#0a3d2f] px-3 py-1 rounded-full text-sm font-bold">
                      SAVE {savingsPercent}%
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap size={16} className="text-[#d4af69]" />
                <span>Or 4 interest-free payments of ${(price / 4).toFixed(2)}</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#9d8b7c]/10">
              <h3 className="font-heading text-xl font-semibold text-[#0a3d2f] mb-4">
                Signature Features
              </h3>
              <ul className="space-y-3">
                {features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-[#d4af69] flex-shrink-0 mt-0.5" />
                    <span className="text-[#2a2a2a]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Variant Selector */}
            {productOptions.map((option) => (
              <div key={option.name} className="space-y-3">
                <label className="block font-semibold text-[#0a3d2f]">
                  {option.name}: <span className="font-normal text-[#2a2a2a]/70">{option.selectedValue}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {option.values.map((value) => (
                    <Link
                      key={value.value}
                      to={value.to}
                      preventScrollReset
                      className={`px-6 py-3 border-2 rounded-xl font-medium transition-all ${
                        value.isActive
                          ? 'border-[#d4af69] bg-[#d4af69] text-white shadow-lg'
                          : value.isAvailable
                          ? 'border-[#9d8b7c]/30 text-[#0a3d2f] hover:border-[#d4af69] hover:shadow-md'
                          : 'border-[#9d8b7c]/20 text-[#2a2a2a]/30 cursor-not-allowed'
                      }`}
                    >
                      {value.value}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block font-semibold text-[#0a3d2f]">Quantity</label>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center border-2 border-[#9d8b7c]/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-[#fefdf8] transition-colors"
                  >
                    <Minus size={18} className="text-[#0a3d2f]" />
                  </button>
                  <span className="px-6 py-3 border-x-2 border-[#9d8b7c]/30 font-semibold text-[#0a3d2f]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 hover:bg-[#fefdf8] transition-colors"
                  >
                    <Plus size={18} className="text-[#0a3d2f]" />
                  </button>
                </div>
                {selectedVariant?.availableForSale && (
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    In Stock - Ships Today
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Buttons */}
            <div className="space-y-3">
              <button
                disabled={!selectedVariant?.availableForSale}
                className="w-full gradient-gold text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <ShoppingBag size={22} />
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600 border-2 border-red-200'
                      : 'bg-white text-[#0a3d2f] border-2 border-[#9d8b7c]/30 hover:border-[#d4af69]'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  Wishlist
                </button>
                <button className="py-3 rounded-xl font-semibold bg-white text-[#0a3d2f] border-2 border-[#9d8b7c]/30 hover:border-[#d4af69] transition-all flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* View More Options */}
            {recommendedProducts.length > 0 && (
              <button
                onClick={() => setShowMoreOptions(true)}
                className="w-full bg-[#1a5757] text-white py-4 rounded-xl font-semibold hover:bg-[#0a3d2f] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                Explore Similar Timepieces
              </button>
            )}

            {/* Trust Badges - Mobile */}
            <div className="lg:hidden grid grid-cols-2 gap-4 bg-white rounded-2xl p-6 shadow-lg border border-[#9d8b7c]/10">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="gradient-gold p-2.5 rounded-lg">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a3d2f] text-sm">{badge.label}</div>
                      <div className="text-xs text-[#2a2a2a]/60">{badge.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-[#9d8b7c]/10">
            <h2 className="font-heading text-3xl font-bold text-[#0a3d2f] mb-6">
              The Art of Timekeeping
            </h2>
            <div
              className="prose prose-lg max-w-none text-[#2a2a2a]/80 leading-relaxed"
              dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
            />
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#9d8b7c]/10 overflow-hidden">
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#fefdf8]/50 transition-colors"
            >
              <h2 className="font-heading text-3xl font-bold text-[#0a3d2f]">
                Technical Specifications
              </h2>
              {showSpecs ? (
                <ChevronUp size={32} className="text-[#d4af69]" />
              ) : (
                <ChevronDown size={32} className="text-[#d4af69]" />
              )}
            </button>
            {showSpecs && (
              <div className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-[#9d8b7c]/20">
                      <span className="font-semibold text-[#0a3d2f]">{key}</span>
                      <span className="text-[#2a2a2a]/70">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-[#9d8b7c]/10">
            <h2 className="font-heading text-3xl font-bold text-[#0a3d2f] mb-6">
              Customer Reviews
            </h2>
            <div id="shopify-product-reviews" className="min-h-[200px]">
              <p className="text-center text-[#2a2a2a]/50 py-12">
                Reviews will appear here once integrated with Shopify review app
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* More Options Modal */}
      {showMoreOptions && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowMoreOptions(false)}
        >
          <div
            className="bg-[#fefdf8] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMoreOptions(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white hover:bg-[#d4af69] rounded-full shadow-xl transition-all group"
            >
              <X size={24} className="text-[#0a3d2f] group-hover:text-white" />
            </button>

            <div className="sticky top-0 bg-gradient-forest text-white px-8 py-6 rounded-t-3xl">
              <h2 className="font-heading text-3xl font-bold">Explore Our Collection</h2>
              <p className="text-white/80 mt-2">Click any timepiece to view details</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProducts.slice(0, 6).map((watch) => (
                  <Link
                    key={watch.id}
                    to={`/products/${watch.handle}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-[#9d8b7c]/10"
                  >
                    <div className="aspect-square bg-[#fefdf8] overflow-hidden">
                      <img
                        src={watch.images?.edges?.[0]?.node?.url || watch.featuredImage?.url}
                        alt={watch.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-semibold text-[#0a3d2f] mb-2 line-clamp-2">
                        {watch.title}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#d4af69] text-lg">
                          ${parseFloat(watch.priceRange?.minVariantPrice?.amount || 0).toFixed(2)}
                        </span>
                        {watch.compareAtPriceRange?.minVariantPrice && (
                          <span className="text-sm text-[#2a2a2a]/50 line-through">
                            ${parseFloat(watch.compareAtPriceRange.minVariantPrice.amount).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}