import {useLoaderData, Link, useSearchParams} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import {useState} from 'react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid3x3,
  List,
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Sparkles,
  TrendingUp,
  Filter,
  Check,
  ChevronRight,
  ArrowUpDown,
  Zap,
} from 'lucide-react';
import {COLLECTION_QUERY} from '../lib/queries';

/**
 * SEO Meta Tags for Collections
 */
export const meta = ({data, params}) => {
  if (!data?.collection) {
    return [{title: 'Collection Not Found | Vastara Luxury Watches'}];
  }

  const {collection} = data;
  const productCount = collection.products?.nodes?.length || 0;
  
  return [
    {title: `${collection.title} - Luxury Watches | Vastara`},
    {
      name: 'description',
      content: collection.seo?.description || 
        `Discover ${productCount}+ premium ${collection.title.toLowerCase()} at Vastara. Swiss-inspired automatic movements, sapphire crystal, free shipping to USA, UK, Canada & Australia.`
    },
    {
      name: 'keywords',
      content: `${collection.title}, luxury watches, automatic watches, swiss movement, premium timepieces, ${collection.title.toLowerCase()} collection, Vastara watches, buy luxury watches online`
    },
    
    // Open Graph
    {property: 'og:title', content: `${collection.title} Collection | Vastara`},
    {property: 'og:description', content: collection.description?.substring(0, 200)},
    {property: 'og:image', content: collection.image?.url},
    {property: 'og:type', content: 'product.group'},
    {property: 'og:url', content: `https://vastara.online/collections/${params.handle}`},
    
    // Twitter Card
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: `${collection.title} | Vastara`},
    {name: 'twitter:description', content: collection.description?.substring(0, 200)},
    {name: 'twitter:image', content: collection.image?.url},
    
    // Canonical
    {tagName: 'link', rel: 'canonical', href: `https://vastara.online/collections/${params.handle}`},
    
    // Schema.org JSON-LD
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: collection.title,
        description: collection.description,
        image: collection.image?.url,
        url: `https://vastara.online/collections/${params.handle}`,
        numberOfItems: productCount,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          offerCount: productCount,
        },
      },
    },
  ];
};

/**
 * Loader - Fetch collection data
 */
export async function loader({params, context, request}) {
  try {
    if (!context || !context.storefront) {
      console.error('Missing storefront context in collections loader');
      throw new Response('Storefront not available', {status: 500});
    }

    const {handle} = params;
    const {storefront} = context;
    const url = new URL(request.url);
    
    const searchParams = getPaginationVariables(request, {pageBy: 24});
    
    // Get filter params
    const sortKey = url.searchParams.get('sort') || 'COLLECTION_DEFAULT';
    const reverse = sortKey === 'PRICE' && url.searchParams.get('order') === 'desc';
    const priceMin = url.searchParams.get('priceMin');
    const priceMax = url.searchParams.get('priceMax');
    const productType = url.searchParams.get('type');
    const vendor = url.searchParams.get('vendor');
    const available = url.searchParams.get('available');

    if (!handle) {
      throw new Response('Expected collection handle', {status: 404});
    }

    const [{collection}] = await Promise.all([
      storefront.query(COLLECTION_QUERY, {
        variables: {
          handle,
          ...searchParams,
          sortKey,
          reverse,
          filters: buildFilters({priceMin, priceMax, productType, vendor, available}),
        },
      }),
    ]);

    if (!collection) {
      throw new Response('Collection not found', {status: 404});
    }

    return defer({
      collection,
      handle,
      appliedFilters: {sortKey, priceMin, priceMax, productType, vendor, available},
    });
  } catch (error) {
    console.error('Error in collections loader:', error);
    throw error;
  }
}

// Build Shopify filters
function buildFilters({priceMin, priceMax, productType, vendor, available}) {
  const filters = [];
  
  if (priceMin || priceMax) {
    filters.push({
      price: {
        min: priceMin ? parseFloat(priceMin) : undefined,
        max: priceMax ? parseFloat(priceMax) : undefined,
      },
    });
  }
  
  if (productType) {
    filters.push({productType});
  }
  
  if (vendor) {
    filters.push({productVendor: vendor});
  }
  
  if (available === 'true') {
    filters.push({available: true});
  }
  
  return filters.length > 0 ? filters : undefined;
}

// Sort options
const SORT_OPTIONS = [
  {label: 'Featured', value: 'COLLECTION_DEFAULT'},
  {label: 'Best Selling', value: 'BEST_SELLING'},
  {label: 'Price: Low to High', value: 'PRICE_ASC'},
  {label: 'Price: High to Low', value: 'PRICE_DESC'},
  {label: 'Alphabetically: A-Z', value: 'TITLE_ASC'},
  {label: 'Alphabetically: Z-A', value: 'TITLE_DESC'},
  {label: 'Date: New to Old', value: 'CREATED_DESC'},
  {label: 'Date: Old to New', value: 'CREATED_ASC'},
];

export default function Collection() {
  const {collection, appliedFilters} = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    priceMin: appliedFilters.priceMin || '',
    priceMax: appliedFilters.priceMax || '',
    type: appliedFilters.productType || '',
    vendor: appliedFilters.vendor || '',
    available: appliedFilters.available || false,
  });

  const products = collection.products.nodes;
  const totalProducts = products.length;

  // Extract unique values for filters
  const productTypes = [...new Set(products.map(p => p.productType).filter(Boolean))];
  const vendors = [...new Set(products.map(p => p.vendor).filter(Boolean))];
  
  // Price range
  const prices = products.map(p => parseFloat(p.priceRange.minVariantPrice.amount));
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    if (localFilters.priceMin) params.set('priceMin', localFilters.priceMin);
    else params.delete('priceMin');
    
    if (localFilters.priceMax) params.set('priceMax', localFilters.priceMax);
    else params.delete('priceMax');
    
    if (localFilters.type) params.set('type', localFilters.type);
    else params.delete('type');
    
    if (localFilters.vendor) params.set('vendor', localFilters.vendor);
    else params.delete('vendor');
    
    if (localFilters.available) params.set('available', 'true');
    else params.delete('available');
    
    setSearchParams(params);
    setShowFilters(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setLocalFilters({
      priceMin: '',
      priceMax: '',
      type: '',
      vendor: '',
      available: false,
    });
    setSearchParams({});
  };

  // Change sort
  const handleSort = (value) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === 'PRICE_ASC') {
      params.set('sort', 'PRICE');
      params.set('order', 'asc');
    } else if (value === 'PRICE_DESC') {
      params.set('sort', 'PRICE');
      params.set('order', 'desc');
    } else if (value === 'TITLE_ASC') {
      params.set('sort', 'TITLE');
      params.set('order', 'asc');
    } else if (value === 'TITLE_DESC') {
      params.set('sort', 'TITLE');
      params.set('order', 'desc');
    } else if (value === 'CREATED_ASC') {
      params.set('sort', 'CREATED');
      params.set('order', 'asc');
    } else if (value === 'CREATED_DESC') {
      params.set('sort', 'CREATED');
      params.set('order', 'desc');
    } else {
      params.set('sort', value);
      params.delete('order');
    }
    
    setSearchParams(params);
    setShowSortDropdown(false);
  };

  const activeFiltersCount = Object.values(localFilters).filter(v => v && v !== false).length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-neutral-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-neutral/60 hover:text-forest-green transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-neutral-light" />
            <Link to="/collections" className="text-neutral/60 hover:text-forest-green transition-colors">
              Collections
            </Link>
            <ChevronRight size={14} className="text-neutral-light" />
            <span className="text-forest-green font-medium">{collection.title}</span>
          </div>
        </div>
      </nav>

      {/* Collection Hero */}
      <div className="relative gradient-forest text-white overflow-hidden">
        {collection.image && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={24} className="text-luxury-gold" />
              <span className="text-luxury-gold uppercase text-sm font-semibold tracking-wider">
                Premium Collection
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                {collection.description}
              </p>
            )}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-luxury-gold" />
                <span>{totalProducts} Timepieces</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-luxury-gold" />
                <span>Free Shipping Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-neutral-light/30 rounded-xl hover:border-luxury-gold transition-all"
            >
              <Filter size={18} />
              <span className="font-semibold">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-luxury-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 border-2 border-neutral-light/30 rounded-xl hover:border-luxury-gold transition-all"
            >
              <SlidersHorizontal size={18} />
              <span className="font-semibold">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-luxury-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="text-sm text-neutral/60">
              Showing <strong>{totalProducts}</strong> {totalProducts === 1 ? 'product' : 'products'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-white border-2 border-neutral-light/30 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-luxury-gold text-white' : 'text-neutral/60 hover:text-forest-green'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-luxury-gold text-white' : 'text-neutral/60 hover:text-forest-green'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-neutral-light/30 rounded-xl hover:border-luxury-gold transition-all"
              >
                <ArrowUpDown size={18} />
                <span className="font-semibold">Sort</span>
                <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-neutral-light/20 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSort(option.value)}
                      className="w-full px-4 py-3 text-left hover:bg-cream transition-colors flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {appliedFilters.sortKey === option.value && (
                        <Check size={16} className="text-luxury-gold" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          {showFilters && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl border-2 border-neutral-light/20 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-2xl font-bold text-forest-green">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-luxury-gold hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold text-forest-green mb-3">Price Range</h4>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder={`$${minPrice}`}
                        value={localFilters.priceMin}
                        onChange={(e) => setLocalFilters({...localFilters, priceMin: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-neutral-light/30 rounded-lg focus:border-luxury-gold outline-none"
                      />
                      <span className="text-neutral/60">to</span>
                      <input
                        type="number"
                        placeholder={`$${maxPrice}`}
                        value={localFilters.priceMax}
                        onChange={(e) => setLocalFilters({...localFilters, priceMax: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-neutral-light/30 rounded-lg focus:border-luxury-gold outline-none"
                      />
                    </div>
                  </div>

                  {/* Product Type */}
                  {productTypes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-forest-green mb-3">Type</h4>
                      <div className="space-y-2">
                        {productTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="type"
                              checked={localFilters.type === type}
                              onChange={() => setLocalFilters({...localFilters, type})}
                              className="w-4 h-4 accent-luxury-gold"
                            />
                            <span className="text-sm group-hover:text-luxury-gold transition-colors">
                              {type}
                            </span>
                          </label>
                        ))}
                        {localFilters.type && (
                          <button
                            onClick={() => setLocalFilters({...localFilters, type: ''})}
                            className="text-sm text-luxury-gold hover:underline"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Brand/Vendor */}
                  {vendors.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-forest-green mb-3">Brand</h4>
                      <div className="space-y-2">
                        {vendors.map((vendor) => (
                          <label key={vendor} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="vendor"
                              checked={localFilters.vendor === vendor}
                              onChange={() => setLocalFilters({...localFilters, vendor})}
                              className="w-4 h-4 accent-luxury-gold"
                            />
                            <span className="text-sm group-hover:text-luxury-gold transition-colors">
                              {vendor}
                            </span>
                          </label>
                        ))}
                        {localFilters.vendor && (
                          <button
                            onClick={() => setLocalFilters({...localFilters, vendor: ''})}
                            className="text-sm text-luxury-gold hover:underline"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Availability */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={localFilters.available}
                        onChange={(e) => setLocalFilters({...localFilters, available: e.target.checked})}
                        className="w-4 h-4 accent-luxury-gold"
                      />
                      <span className="text-sm font-semibold group-hover:text-luxury-gold transition-colors">
                        In Stock Only
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full mt-6 gradient-gold text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-light/10 rounded-full mb-4">
                  <Eye size={32} className="text-neutral-light" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-forest-green mb-2">
                  No products found
                </h3>
                <p className="text-neutral/60 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 gradient-gold text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {products.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-light/20 flex items-center justify-between">
              <h3 className="font-heading text-2xl font-bold text-forest-green">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Same filter content as desktop - simplified for brevity */}
              <div>
                <h4 className="font-semibold text-forest-green mb-3">Price Range</h4>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder={`$${minPrice}`}
                    value={localFilters.priceMin}
                    onChange={(e) => setLocalFilters({...localFilters, priceMin: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-neutral-light/30 rounded-lg focus:border-luxury-gold outline-none"
                  />
                  <span className="text-neutral/60">to</span>
                  <input
                    type="number"
                    placeholder={`$${maxPrice}`}
                    value={localFilters.priceMax}
                    onChange={(e) => setLocalFilters({...localFilters, priceMax: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-neutral-light/30 rounded-lg focus:border-luxury-gold outline-none"
                  />
                </div>
              </div>

              {productTypes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-forest-green mb-3">Type</h4>
                  <div className="space-y-2">
                    {productTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type-mobile"
                          checked={localFilters.type === type}
                          onChange={() => setLocalFilters({...localFilters, type})}
                          className="w-4 h-4 accent-luxury-gold"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.available}
                    onChange={(e) => setLocalFilters({...localFilters, available: e.target.checked})}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <span className="text-sm font-semibold">In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-neutral-light/20 p-6 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 border-2 border-neutral-light/30 rounded-xl font-semibold hover:border-luxury-gold transition-all"
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 gradient-gold text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
            title: collection.title,
          },
        }}
      />
    </div>
  );
}

/**
 * Product Card Component
 */
function ProductCard({product, viewMode, index}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePrice = product.compareAtPriceRange?.minVariantPrice
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : 0;
  const savings = comparePrice > price ? comparePrice - price : 0;
  const savingsPercent = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  
  const primaryImage = product.images?.edges?.[0]?.node || product.featuredImage;
  const secondaryImage = product.images?.edges?.[1]?.node;

  if (viewMode === 'list') {
    return (
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neutral-light/10 animate-fade-in flex"
        style={{animationDelay: `${index * 50}ms`}}
      >
        <Link to={`/products/${product.handle}`} className="w-64 flex-shrink-0 relative group">
          <div className="aspect-square bg-cream relative overflow-hidden">
            <img
              src={primaryImage?.url}
              alt={primaryImage?.altText || product.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {secondaryImage && (
              <img
                src={secondaryImage.url}
                alt={secondaryImage.altText || product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
            {savings > 0 && (
              <div className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-xs font-bold">
                {savingsPercent}% OFF
              </div>
            )}
          </div>
        </Link>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <Link to={`/products/${product.handle}`}>
              <div className="text-luxury-gold text-sm font-semibold uppercase tracking-wider mb-2">
                {product.vendor || 'VASTARA'}
              </div>
              <h3 className="font-heading text-2xl font-bold text-forest-green mb-3 hover:text-luxury-gold transition-colors">
                {product.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-luxury-gold text-luxury-gold" />
              ))}
              <span className="text-sm text-neutral/60 ml-2">4.8 (127)</span>
            </div>
            <p className="text-neutral/70 text-sm leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-heading text-3xl font-bold text-luxury-gold">
                ${price.toFixed(2)}
              </span>
              {comparePrice > price && (
                <span className="text-lg text-neutral/50 line-through">
                  ${comparePrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Link
                to={`/products/${product.handle}`}
                className="flex-1 gradient-gold text-white py-3 px-6 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                View Details
              </Link>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-white text-forest-green border-neutral-light/30 hover:border-luxury-gold'
                }`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neutral-light/10 group animate-fade-in"
      style={{animationDelay: `${index * 50}ms`}}
    >
      <Link to={`/products/${product.handle}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-cream relative overflow-hidden">
          <img
            src={primaryImage?.url}
            alt={primaryImage?.altText || product.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {secondaryImage && (
            <img
              src={secondaryImage.url}
              alt={secondaryImage.altText || product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          {savings > 0 && (
            <div className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {savingsPercent}% OFF
            </div>
          )}
          {!product.availableForSale && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-lg font-bold">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-3 rounded-full shadow-xl transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-forest-green hover:bg-white'
            }`}
          >
            <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/products/${product.handle}`}>
          <div className="text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
            {product.vendor || 'VASTARA'}
          </div>
          <h3 className="font-heading text-xl font-bold text-forest-green mb-2 hover:text-luxury-gold transition-colors line-clamp-2 min-h-[56px]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-luxury-gold text-luxury-gold" />
          ))}
          <span className="text-xs text-neutral/60 ml-1">4.8</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-heading text-2xl font-bold text-luxury-gold">
            ${price.toFixed(2)}
          </span>
          {comparePrice > price && (
            <span className="text-sm text-neutral/50 line-through">
              ${comparePrice.toFixed(2)}
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.handle}`}
          className="w-full gradient-gold text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
        >
          <ShoppingBag size={18} />
          Quick View
        </Link>
      </div>
    </div>
  );
}

