import {useLoaderData, Link} from '@remix-run/react';
import {defer} from '@remix-run/node';
import {useState} from 'react';
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
  CreditCard,
  Truck,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import {PRODUCT_QUERY, RECOMMENDED_PRODUCTS_QUERY} from '../lib/queries';

/**
 * SEO Meta Tags
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
          ratingValue: '4.9',
          reviewCount: '8000',
        },
      },
    },
  ];
};

/**
 * Loader - Fetch product data
 */
export async function loader({params, context, request}) {
  try {
    if (!context || !context.storefront) {
      console.error('Missing storefront context in products loader');
      throw new Response('Storefront not available', {status: 500});
    }

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
  } catch (error) {
    console.error('Error in products loader:', error);
    throw error;
  }
}

// Sample customer reviews
const customerReviews = [
  {
    name: 'Sarah L.',
    verified: true,
    rating: 5,
    text: 'Absolutely love this watch! It\'s the perfect blend of classic and modern. Goes with everything in my wardrobe.',
    timeAgo: '2 days ago',
  },
  {
    name: 'Michael R.',
    verified: true,
    rating: 5,
    text: 'Best watch purchase I\'ve made. The quality is outstanding and it looks even better in person.',
    timeAgo: '5 days ago',
  },
  {
    name: 'Emma T.',
    verified: true,
    rating: 5,
    text: 'So versatile! I wear it to work, on weekends, and even to formal events. Highly recommend!',
    timeAgo: '1 week ago',
  },
  {
    name: 'David K.',
    verified: true,
    rating: 5,
    text: 'The chronograph feature is really useful. Great value for money and looks premium.',
    timeAgo: '1 week ago',
  },
  {
    name: 'Lisa M.',
    verified: true,
    rating: 5,
    text: 'Comfortable strap, easy to read, and the design is timeless. Will definitely buy another one.',
    timeAgo: '2 weeks ago',
  },
  {
    name: 'James P.',
    verified: true,
    rating: 5,
    text: 'Perfect everyday watch. The build quality is impressive and it keeps excellent time.',
    timeAgo: '2 weeks ago',
  },
];

// FAQ questions
const faqQuestions = [
  {
    question: 'Is this watch suitable for everyday wear?',
    answer: 'Yes! The Vastara ADDIESDIVE is designed for everyday wear. Its classic design works for both casual and formal occasions.',
  },
  {
    question: 'What makes the Vastara ADDIESDIVE watch stand out?',
    answer: 'Our watch combines timeless design with modern functionality. The chronograph feature, premium materials, and attention to detail make it stand out.',
  },
  {
    question: 'Can I wear this watch for both casual and formal events?',
    answer: 'Absolutely! The versatile design transitions seamlessly from day to night, casual to formal.',
  },
  {
    question: 'Is the strap comfortable for long periods?',
    answer: 'Yes, the premium leather strap is designed for all-day comfort and durability.',
  },
  {
    question: 'Will this watch truly elevate my personal style?',
    answer: 'Definitely! The classic chronograph design adds sophistication to any outfit and complements your personal style.',
  },
  {
    question: 'What if I\'m not sure about the chronograph features?',
    answer: 'The chronograph is easy to use and adds functionality without complexity. Our customer support team can help you learn how to use it.',
  },
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Get images
  const productImages = product.media?.nodes || product.images?.edges?.map(({node}) => node) || [];
  const currentImage = productImages[selectedImage] || selectedVariant?.image;

  // Calculate savings
  const price = parseFloat(selectedVariant?.price?.amount || 0);
  const comparePrice = parseFloat(selectedVariant?.compareAtPrice?.amount || 0);
  const savings = comparePrice > price ? comparePrice - price : 0;
  const savingsPercent = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  // Get color options (filter for Color variant)
  const colorOption = productOptions.find(opt => opt.name.toLowerCase() === 'color');
  const colorVariants = colorOption?.values || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Free Shipping Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Enjoy free shipping on all orders!
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={currentImage?.url || currentImage?.image?.url}
                alt={currentImage?.altText || product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-pink-500 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300'
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

            {/* Feature Icons Bar */}
            <div className="bg-gray-100 rounded-lg p-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm font-semibold text-gray-800 mb-1">Elevate your everyday style</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 mb-1">Looks good with everything</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 mb-1">Built to last, wear forever</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Rating & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-green-600 font-semibold text-sm">4.9/5 stars</span>
              <span className="text-gray-500 text-sm">based on 8,000+ reviews</span>
              <span className="text-gray-400 text-xs">Trustpilot</span>
            </div>

            {/* Product Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.title}: The only watch you'll ever need.
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">${price.toFixed(2)}</span>
              {comparePrice > price && (
                <>
                  <span className="text-2xl text-gray-400 line-through">${comparePrice.toFixed(2)}</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                    SAVE ${savings.toFixed(0)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Elevate your everyday style with our classic chronograph. This watch is built to last, wear forever, and is the perfect accessory for any occasion.
            </p>

            {/* Color Selection */}
            {colorOption && (
              <div className="space-y-3">
                <label className="block font-semibold text-gray-900">Color</label>
                <div className="flex gap-3">
                  {colorVariants.map((variant) => (
                    <Link
                      key={variant.value}
                      to={variant.to}
                      preventScrollReset
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                        variant.isActive
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {variant.value}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              disabled={!selectedVariant?.availableForSale}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ADD TO CART
            </button>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">We accept:</span>
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-gray-400" />
                <span className="text-xs text-gray-500">Visa, Mastercard, Amex, PayPal, Shop Pay, Google Pay, Apple Pay</span>
              </div>
            </div>

            {/* Trust Boxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">Try risk-free for 30 days</div>
                <div className="text-sm text-gray-600">Free returns & exchanges</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">Speedy delivery</div>
                <div className="text-sm text-gray-600">Estimated 3-5 business days</div>
              </div>
            </div>

            {/* Expandable FAQ Sections */}
            <div className="space-y-2">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
                className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">Will this watch match my everyday style and special occasions?</span>
                {expandedFaq === 0 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedFaq === 0 && (
                <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                  Yes! The versatile design works perfectly for both everyday wear and special occasions.
                </div>
              )}

              <button
                onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">Is the Vastara ADDIESDIVE watch built to last?</span>
                {expandedFaq === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedFaq === 1 && (
                <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                  Absolutely! We use premium materials and expert craftsmanship to ensure your watch lasts for years.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="mt-20 space-y-20">
          {/* Your watch, your way */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your watch, your way</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={productImages[0]?.url || productImages[0]?.image?.url}
                    alt="Set the time & date"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Set the time & date</h3>
                <p className="text-gray-600">Easy-to-use crown for precise time and date setting.</p>
              </div>
              <div className="text-center">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={productImages[1]?.url || productImages[1]?.image?.url || productImages[0]?.url}
                    alt="Master the stopwatch"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Master the stopwatch</h3>
                <p className="text-gray-600">Professional chronograph functionality at your fingertips.</p>
              </div>
              <div className="text-center">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={productImages[2]?.url || productImages[2]?.image?.url || productImages[0]?.url}
                    alt="Wear it anywhere"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Wear it anywhere</h3>
                <p className="text-gray-600">From office to weekend adventures, this watch adapts.</p>
              </div>
            </div>
          </div>

          {/* Effortless style */}
          <div className="bg-pink-50 rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl mb-2">✨</div>
                    <h3 className="font-semibold mb-2">Effortless style</h3>
                    <p className="text-sm text-gray-600">Timeless design that complements any outfit</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">⚙️</div>
                    <h3 className="font-semibold mb-2">Precision engineering</h3>
                    <p className="text-sm text-gray-600">Reliable movement for accurate timekeeping</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🛡️</div>
                    <h3 className="font-semibold mb-2">Built to last</h3>
                    <p className="text-sm text-gray-600">Premium materials for years of wear</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">⏰</div>
                    <h3 className="font-semibold mb-2">Your go-to timepiece</h3>
                    <p className="text-sm text-gray-600">The watch you'll reach for every day</p>
                  </div>
                </div>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={productImages[0]?.url || productImages[0]?.image?.url}
                  alt="Effortless style"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Your Vastara, your way */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your Vastara, your way</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="text-center">
                  <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={productImages[0]?.url || productImages[0]?.image?.url}
                      alt={`Step ${num}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {num}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {num === 1 && 'Set the time'}
                    {num === 2 && 'Master the chronograph'}
                    {num === 3 && 'Style & maintenance'}
                  </h3>
                  <p className="text-gray-600">
                    {num === 1 && 'Easy time and date setting with the crown'}
                    {num === 2 && 'Use the chronograph for timing events'}
                    {num === 3 && 'Care instructions to keep it looking new'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Effortless style, every moment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[0]?.url || productImages[0]?.image?.url}
                alt="Effortless style"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Effortless style, every moment.</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The Vastara ADDIESDIVE combines classic elegance with modern functionality. Whether you're heading to the office or a weekend adventure, this watch seamlessly blends with your style.
              </p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Claim your style
              </button>
            </div>
          </div>

          {/* Elevate your wrist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✨</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Effortless style</h3>
                    <p className="text-gray-600">Timeless design that works for every occasion</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">💎</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Built to impress</h3>
                    <p className="text-gray-600">Premium materials and expert craftsmanship</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Master your day</h3>
                    <p className="text-gray-600">Chronograph functionality for precision timing</p>
                  </div>
                </div>
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                grab yours now
              </button>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[0]?.url || productImages[0]?.image?.url}
                alt="Elevate your wrist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <div className="bg-green-100 rounded-lg p-6 text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-green-500 text-green-500" />
              ))}
            </div>
            <div className="text-2xl font-bold text-gray-900">4.9/5 stars based on 8,000+ customers</div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why our customers love us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerReviews.map((review, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Verified Buyer</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{review.text}</p>
                <div className="text-sm text-gray-500">{review.timeAgo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your style questions, answered.</h2>
            <p className="text-gray-600 mb-8">
              We're here to help you find the perfect watch for your style and needs.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Need more answers?</div>
                  <div className="text-sm text-gray-600">Our support team is here to help</div>
                </div>
              </div>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {faqQuestions.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx + 10 ? null : idx + 10)}
                  className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === idx + 10 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFaq === idx + 10 && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Features */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">⏰</div>
            <div className="font-semibold text-gray-900 mb-1">Your go-to timepiece</div>
            <div className="text-sm text-gray-600">The watch you'll wear every day</div>
          </div>
          <div>
            <div className="text-3xl mb-3">💎</div>
            <div className="font-semibold text-gray-900 mb-1">Crafted to impress</div>
            <div className="text-sm text-gray-600">Premium quality materials</div>
          </div>
          <div>
            <div className="text-3xl mb-3">⏱️</div>
            <div className="font-semibold text-gray-900 mb-1">Master your moments</div>
            <div className="text-sm text-gray-600">Chronograph functionality</div>
          </div>
          <div>
            <div className="text-3xl mb-3">✨</div>
            <div className="font-semibold text-gray-900 mb-1">Uniquely you</div>
            <div className="text-sm text-gray-600">Express your personal style</div>
          </div>
        </div>
      </div>

      <Analytics.PageView />
    </div>
  );
}
