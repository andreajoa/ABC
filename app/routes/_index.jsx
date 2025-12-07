import {useLoaderData, Link} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import {useState, useEffect} from 'react';
import {Analytics} from '@shopify/hydrogen';
import {
  ChevronRight,
  Star,
  Shield,
  RotateCcw,
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  Globe,
  Users,
  Heart,
  ShoppingBag,
  ArrowRight,
  Play,
  CheckCircle2,
  Quote,
  Mail,
  Truck,
  ChevronLeft,
} from 'lucide-react';
import {COLLECTIONS_QUERY, FEATURED_PRODUCTS_QUERY} from '../lib/queries';

/**
 * SEO Meta Tags for Homepage
 */
export const meta = () => {
  return [
    {title: 'Vastara Luxury Watches | Swiss-Inspired Automatic Timepieces | Free Worldwide Shipping'},
    {
      name: 'description',
      content: 'Discover premium automatic watches with Swiss-inspired movements, sapphire crystal, and 5-year warranty. Shop luxury timepieces with free shipping to USA, UK, Canada & Australia. 60-day returns.'
    },
    {
      name: 'keywords',
      content: 'luxury watches, automatic watches, swiss movement, premium timepieces, men watches, women watches, sapphire crystal, luxury watch store, buy watches online, Vastara'
    },
    
    // Open Graph
    {property: 'og:title', content: 'Vastara - Premium Automatic Watches'},
    {property: 'og:description', content: 'Swiss-inspired luxury timepieces. Free worldwide shipping, 5-year warranty, 60-day returns.'},
    {property: 'og:image', content: 'https://vastara.online/og-image.jpg'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://vastara.online'},
    
    // Twitter Card
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'Vastara Luxury Watches'},
    {name: 'twitter:description', content: 'Swiss-inspired automatic timepieces with premium craftsmanship'},
    {name: 'twitter:image', content: 'https://vastara.online/twitter-image.jpg'},
    
    // Canonical
    {tagName: 'link', rel: 'canonical', href: 'https://vastara.online'},
    
    // Schema.org JSON-LD
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vastara',
        description: 'Premium luxury watch retailer specializing in Swiss-inspired automatic timepieces',
        url: 'https://vastara.online',
        logo: 'https://vastara.online/logo.png',
        sameAs: [
          'https://www.facebook.com/vastara',
          'https://www.instagram.com/vastara',
          'https://twitter.com/vastara',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-800-VASTARA',
          contactType: 'customer service',
          areaServed: ['US', 'GB', 'CA', 'AU'],
          availableLanguage: 'English',
        },
      },
    },
  ];
};

/**
 * Loader - Fetch homepage data
 */
export async function loader({context}) {
  const {storefront} = context;

  const [{collections}, {products: featuredProducts}] = await Promise.all([
    storefront.query(COLLECTIONS_QUERY),
    storefront.query(FEATURED_PRODUCTS_QUERY),
  ]);

  return defer({
    collections: collections.nodes,
    featuredProducts: featuredProducts.nodes,
  });
}

// Trust indicators data
const trustBadges = [
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Every watch comes with certificate of authenticity',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Truck,
    title: 'Free Worldwide Shipping',
    description: 'Express delivery to USA, UK, Canada & Australia',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: RotateCcw,
    title: '60-Day Easy Returns',
    description: 'Risk-free shopping with hassle-free returns',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Award,
    title: '5-Year Warranty',
    description: 'Comprehensive global warranty coverage',
    color: 'from-amber-500 to-amber-600',
  },
];

// Statistics
const stats = [
  {number: '50K+', label: 'Happy Customers', icon: Users},
  {number: '500+', label: 'Premium Timepieces', icon: Clock},
  {number: '98%', label: 'Satisfaction Rate', icon: Star},
  {number: '45+', label: 'Countries Served', icon: Globe},
];

// Testimonials
const testimonials = [
  {
    name: 'Michael Chen',
    location: 'New York, USA',
    rating: 5,
    text: 'Absolutely stunning craftsmanship. The automatic movement is smooth and precise. This is my third Vastara watch, and each one exceeds expectations.',
    verified: true,
  },
  {
    name: 'Sophie Williams',
    location: 'London, UK',
    rating: 5,
    text: 'Elegant design and exceptional quality. The sapphire crystal is flawless, and the packaging was luxurious. Worth every penny!',
    verified: true,
  },
  {
    name: 'James Anderson',
    location: 'Toronto, Canada',
    rating: 5,
    text: 'Best watch purchase I\'ve ever made. The customer service was outstanding, and the watch arrived beautifully packaged. Highly recommend!',
    verified: true,
  },
];

// Press mentions
const pressMentions = [
  {name: 'Forbes'},
  {name: 'GQ'},
  {name: 'Esquire'},
  {name: 'Time Magazine'},
  {name: 'The Watch Observer'},
];

export default function Homepage() {
  const {collections, featuredProducts} = useLoaderData();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate collections carousel
  useEffect(() => {
    if (collections && collections.length > 0) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % collections.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [collections]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-forest">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af69 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float" style={{animationDelay: '0s'}}>
          <Sparkles size={40} className="text-luxury-gold opacity-20" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float" style={{animationDelay: '2s'}}>
          <Clock size={60} className="text-luxury-gold opacity-20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{animationDelay: '1s'}}>
          <Star size={30} className="text-luxury-gold opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          <div className="animate-fade-in-up">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full px-6 py-2 mb-8">
              <Award size={20} className="text-luxury-gold" />
              <span className="text-luxury-gold font-semibold text-sm tracking-wider">ESTABLISHED 2020 • SWISS INSPIRED</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-shadow-gold">
              Timeless Luxury,
              <br />
              <span className="text-luxury-gold">Modern Precision</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect fusion of Swiss-inspired craftsmanship and contemporary design. 
              Each timepiece is a masterpiece of horological excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/collections/all"
                className="group gradient-gold text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-luxury-gold/50 transition-all flex items-center gap-3"
              >
                <span>Explore Collection</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3">
                <Play size={20} />
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-luxury-gold" />
                <span>Authenticity Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-luxury-gold" />
                <span>Free Global Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} className="text-luxury-gold" />
                <span>5-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-luxury-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-luxury-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Press Mentions */}
      <section className="bg-white py-12 border-y border-neutral-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral/60 text-sm font-semibold uppercase tracking-wider mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            {pressMentions.map((press, idx) => (
              <div key={idx} className="text-2xl font-bold text-neutral">
                {press.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="gradient-forest text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/20 rounded-full mb-4">
                    <Icon size={28} className="text-luxury-gold" />
                  </div>
                  <div className="font-display text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Collections Carousel */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-px gradient-gold" />
              <Sparkles size={20} className="text-luxury-gold" />
              <div className="w-12 h-px gradient-gold" />
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-forest-green mb-4">
              Curated Collections
            </h2>
            <p className="text-xl text-neutral/70 max-w-2xl mx-auto">
              Discover our meticulously crafted collections, each telling a unique story of elegance and precision.
            </p>
          </div>

          {collections && collections.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex gap-6 transition-transform duration-500" style={{
                  transform: `translateX(-${carouselIndex * (100 / Math.min(collections.length, 3))}%)`,
                }}>
                  {collections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collections/${collection.handle}`}
                      className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 group"
                    >
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[3/4]">
                        {collection.image?.url ? (
                          <img
                            src={collection.image.url}
                            alt={collection.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full gradient-forest" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <h3 className="font-display text-3xl font-bold mb-2">{collection.title}</h3>
                          <p className="text-white/80 mb-4 line-clamp-2">{collection.description}</p>
                          <div className="flex items-center gap-2 text-luxury-gold font-semibold">
                            <span>Explore Collection</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              {collections.length > 1 && (
                <>
                  <button
                    onClick={() => setCarouselIndex((carouselIndex - 1 + collections.length) % collections.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-2xl transition-all"
                  >
                    <ChevronLeft size={24} className="text-forest-green" />
                  </button>
                  <button
                    onClick={() => setCarouselIndex((carouselIndex + 1) % collections.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-2xl transition-all"
                  >
                    <ChevronRight size={24} className="text-forest-green" />
                  </button>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-2 mt-8">
                    {collections.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === carouselIndex ? 'w-8 bg-luxury-gold' : 'w-2 bg-neutral-light/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp size={24} className="text-luxury-gold" />
              <span className="text-luxury-gold font-semibold uppercase tracking-wider">Best Sellers</span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-forest-green mb-4">
              Customer Favorites
            </h2>
            <p className="text-xl text-neutral/70 max-w-2xl mx-auto">
              The timepieces that have captured hearts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts && featuredProducts.slice(0, 8).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collections/all"
              className="inline-flex items-center gap-2 gradient-gold text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all"
            >
              <span>View All Timepieces</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-20 bg-gradient-to-br from-cream to-[#f5f1e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-forest-green mb-4">
              The Vastara Promise
            </h2>
            <p className="text-xl text-neutral/70">
              Your satisfaction and trust are our highest priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${badge.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-forest-green mb-3">
                    {badge.title}
                  </h3>
                  <p className="text-neutral/70 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 gradient-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Quote size={48} className="text-luxury-gold mx-auto mb-6" />
            <h2 className="font-display text-5xl lg:text-6xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-white/80">
              Don't just take our word for it
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <div className="flex items-center gap-1 mb-6 justify-center">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={24} className="fill-luxury-gold text-luxury-gold" />
                ))}
              </div>

              <p className="text-2xl text-white leading-relaxed mb-8 text-center font-light">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-2xl font-bold">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-lg flex items-center gap-2">
                    {testimonials[activeTestimonial].name}
                    {testimonials[activeTestimonial].verified && (
                      <CheckCircle2 size={18} className="text-luxury-gold" />
                    )}
                  </div>
                  <div className="text-white/60">{testimonials[activeTestimonial].location}</div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeTestimonial ? 'w-8 bg-luxury-gold' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-forest rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af69 1px, transparent 0)',
                backgroundSize: '30px 30px',
              }} />
            </div>

            <div className="relative z-10">
              <Mail size={48} className="text-luxury-gold mx-auto mb-6" />
              <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
                Join Our Elite Circle
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get exclusive access to new releases, special offers, and horological insights
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full text-forest-green outline-none focus:ring-4 focus:ring-luxury-gold/50"
                />
                <button
                  type="submit"
                  className="gradient-gold px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>

              <p className="text-sm text-white/60 mt-4">
                🎁 Get 10% off your first order when you subscribe
              </p>
            </div>
          </div>
        </div>
      </section>

      <Analytics.PageView />
    </div>
  );
}

/**
 * Product Card Component
 */
function ProductCard({product, index}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePrice = product.compareAtPriceRange?.minVariantPrice
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : 0;
  const savings = comparePrice > price ? comparePrice - price : 0;
  const savingsPercent = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neutral-light/10"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        {product.featuredImage?.url ? (
          <img
            src={product.featuredImage.url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full gradient-forest" />
        )}
        
        {/* Sale Badge */}
        {savings > 0 && (
          <div className="absolute top-4 right-4 gradient-gold text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {savingsPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral'}
          />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            alert(`Added ${product.title} to cart!`);
          }}
          className="absolute bottom-4 left-4 right-4 gradient-gold text-white py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          <span>Quick Add</span>
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-luxury-gold text-luxury-gold" />
          ))}
          <span className="text-sm text-neutral/60 ml-1">(4.8)</span>
        </div>

        <h3 className="font-heading text-xl font-semibold text-forest-green mb-3 group-hover:text-luxury-gold transition-colors line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl font-bold text-forest-green">
            ${price.toFixed(2)}
          </span>
          {comparePrice > price && (
            <span className="text-lg text-neutral/40 line-through">
              ${comparePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

