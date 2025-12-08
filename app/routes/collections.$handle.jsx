import {defer} from '@remix-run/node';
import {useLoaderData, Link} from '@remix-run/react';
import {useState} from 'react';
import {Star, X, Plus, Minus, ShoppingBag} from 'lucide-react';

export async function loader({params}) {
  const {handle} = params;
  
  // Mock collection data - replace with real Shopify data
  const collections = {
    'new-arrivals': {
      title: 'New Arrivals',
      description: 'Discover our latest timepieces, fresh from the workshop. Each piece represents the cutting edge of horological design.',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80'
    },
    'automatic-watches': {
      title: 'Automatic Watches',
      description: 'Swiss automatic movements that beat with precision. Self-winding mechanical masterpieces for the true enthusiast.',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80'
    },
    'mens-watches': {
      title: "Men's Collection",
      description: 'Bold, sophisticated timepieces designed for the modern gentleman. Power, precision, and timeless style.',
      image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1200&q=80'
    },
    'womens-watches': {
      title: "Women's Collection",
      description: 'Elegant timepieces that combine feminine grace with technical excellence. Refined luxury for every occasion.',
      image: 'https://images.unsplash.com/photo-1616084160734-a1e5cbc8b858?w=1200&q=80'
    },
    'sport-watches': {
      title: 'Sport Watches',
      description: 'Built for adventure. Water-resistant, shock-proof, and ready for anything life throws at you.',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80'
    },
    'luxury-collection': {
      title: 'Luxury Edition',
      description: 'Our most exclusive timepieces. Premium materials, intricate complications, and unparalleled craftsmanship.',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1200&q=80'
    },
    'dive-watches': {
      title: 'Dive Watches',
      description: 'Professional dive watches tested to 300m+. Swiss movements meet serious underwater engineering.',
      image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1200&q=80'
    },
    'vintage-inspired': {
      title: 'Vintage Collection',
      description: 'Classic designs reimagined for today. Timeless aesthetics with modern reliability.',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80'
    }
  };

  const mockProducts = Array.from({length: 12}, (_, i) => ({
    id: `${handle}-${i + 1}`,
    title: `${collections[handle]?.title || 'Watch'} Model ${i + 1}`,
    handle: `${handle}-model-${i + 1}`,
    description: 'Swiss automatic movement with sapphire crystal glass, 200m water resistance, and premium 316L stainless steel case. Features luminous hands, date display, and scratch-resistant coating.',
    priceRange: { minVariantPrice: { amount: String(799 + Math.random() * 1500), currencyCode: 'USD' } },
    compareAtPriceRange: Math.random() > 0.5 ? { minVariantPrice: { amount: String(999 + Math.random() * 2000) } } : null,
    images: { 
      nodes: [
        { url: `https://images.unsplash.com/photo-${['1523170335258-f5ed11844a49', '1524592094714-0f0654e20314', '1533139502658-0198f920d8e8', '1587836374828-4dbafa94cf0e', '1614164185128-e4ec99c436d7', '1509048191080-d2984bad6ae5', '1547996160-81dfa63595aa', '1526045478516-99145907023c', '1522312346375-d1a52e2b99b3', '1508685096489-7aacd43bd3b1', '1524805444758-089113d48a6d', '1542496658-e33a6d0d50f6'][i % 12]}?w=800&q=80` }
      ] 
    },
    variants: {
      nodes: [
        { id: '1', title: 'Silver/Black', availableForSale: true },
        { id: '2', title: 'Gold/Blue', availableForSale: true },
        { id: '3', title: 'Rose Gold/White', availableForSale: true }
      ]
    }
  }));

  return defer({
    collection: collections[handle] || {title: 'Collection', description: 'Premium timepieces'},
    products: mockProducts
  });
}

function ProductQuickView({product, onClose, onAddToCart}) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.nodes[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-ivory-premium rounded-xl max-w-5xl w-full shadow-2xl transform animate-slideUp overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="relative">
            <img
              src={product.images.nodes[0]?.url}
              alt={product.title}
              className="w-full rounded-xl shadow-lg"
            />
            <div className="absolute top-4 left-4 bg-champagne-gold text-charcoal-noir px-4 py-2 rounded-lg text-xs font-bold">
              QUICK VIEW
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-charcoal-noir/10 hover:bg-charcoal-noir/20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-charcoal-noir" />
            </button>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
              ))}
              <span className="text-sm text-soft-taupe ml-2">(847 reviews)</span>
            </div>

            <h2 className="font-serif text-4xl font-bold text-forest-luxe mb-4">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-charcoal-noir">
                ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </span>
              {product.compareAtPriceRange && (
                <span className="text-xl text-soft-taupe line-through">
                  ${parseFloat(product.compareAtPriceRange.minVariantPrice.amount).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-soft-taupe mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-charcoal-noir mb-3">
                Select Style
              </label>
              <div className="flex flex-wrap gap-3">
                {product.variants.nodes.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-forest-luxe bg-forest-luxe text-ivory-premium'
                        : 'border-soft-taupe/30 text-charcoal-noir hover:border-forest-luxe'
                    }`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-charcoal-noir mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-soft-taupe/30 flex items-center justify-center hover:border-forest-luxe transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold text-charcoal-noir w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-soft-taupe/30 flex items-center justify-center hover:border-forest-luxe transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              <button
                onClick={() => {
                  onAddToCart(product, selectedVariant, quantity);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-forest-luxe to-deep-teal text-ivory-premium py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <Link
                to={`/products/${product.handle}`}
                className="block w-full text-center border-2 border-forest-luxe text-forest-luxe py-4 rounded-xl font-semibold text-lg hover:bg-forest-luxe hover:text-ivory-premium transition-all"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({isOpen, onClose, cart, onUpdateQuantity, onRemove}) {
  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const savings = cart.reduce((sum, item) => {
    if (item.comparePrice) {
      return sum + ((parseFloat(item.comparePrice) - parseFloat(item.price)) * item.quantity);
    }
    return sum;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory-premium shadow-2xl transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-luxe to-deep-teal p-6 text-ivory-premium">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-3xl font-bold">Your Cart</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-champagne-gold text-sm">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-soft-taupe mx-auto mb-4" />
                <p className="text-xl text-soft-taupe mb-2">Your cart is empty</p>
                <p className="text-sm text-soft-taupe">Start adding some amazing timepieces!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.variant.id}`} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest-luxe mb-1">{item.title}</h3>
                    <p className="text-sm text-soft-taupe mb-2">{item.variant.title}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item, -1)}
                          className="w-7 h-7 rounded border border-soft-taupe/30 flex items-center justify-center hover:border-forest-luxe transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item, 1)}
                          className="w-7 h-7 rounded border border-soft-taupe/30 flex items-center justify-center hover:border-forest-luxe transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemove(item)}
                        className="text-sm text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <span className="font-bold text-charcoal-noir">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                      {item.comparePrice && (
                        <span className="text-sm text-soft-taupe line-through ml-2">
                          ${(parseFloat(item.comparePrice) * item.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-soft-taupe/20 p-6 bg-white">
              {savings > 0 && (
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-green-600 font-semibold">You're saving</span>
                  <span className="text-green-600 font-bold">${savings.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-charcoal-noir">Subtotal</span>
                <span className="text-2xl font-bold text-forest-luxe">${subtotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-gradient-to-r from-forest-luxe to-deep-teal text-ivory-premium py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mb-3">
                Proceed to Checkout
              </button>
              
              <button
                onClick={onClose}
                className="w-full text-center text-forest-luxe font-semibold py-3 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  const {collection, products} = useLoaderData();
  const [gridCols, setGridCols] = useState(3);
  const [mobileView, setMobileView] = useState('carousel');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product, variant, quantity) => {
    const newItem = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: product.images.nodes[0]?.url,
      price: product.priceRange.minVariantPrice.amount,
      comparePrice: product.compareAtPriceRange?.minVariantPrice?.amount,
      variant: variant,
      quantity: quantity
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === newItem.id && item.variant.id === newItem.variant.id
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === newItem.id && item.variant.id === newItem.variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, newItem];
    });

    setShowCart(true);
  };

  const updateQuantity = (item, change) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.id === item.id && cartItem.variant.id === item.variant.id
          ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + change) }
          : cartItem
      )
    );
  };

  const removeItem = (item) => {
    setCart(prevCart =>
      prevCart.filter(cartItem =>
        !(cartItem.id === item.id && cartItem.variant.id === item.variant.id)
      )
    );
  };

  return (
    <div className="bg-ivory-premium min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');
        
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }

        .bg-forest-luxe { background-color: #0a3d2f; }
        .bg-champagne-gold { background-color: #d4af69; }
        .bg-ivory-premium { background-color: #fefdf8; }
        .bg-deep-teal { background-color: #1a5757; }
        .bg-charcoal-noir { background-color: #2a2a2a; }
        .bg-soft-taupe { background-color: #9d8b7c; }
        
        .text-forest-luxe { color: #0a3d2f; }
        .text-champagne-gold { color: #d4af69; }
        .text-ivory-premium { color: #fefdf8; }
        .text-deep-teal { color: #1a5757; }
        .text-charcoal-noir { color: #2a2a2a; }
        .text-soft-taupe { color: #9d8b7c; }
        
        .border-champagne-gold { border-color: #d4af69; }
        .border-forest-luxe { border-color: #0a3d2f; }
        
        .fill-champagne-gold { fill: #d4af69; }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={showCart} 
        onClose={() => setShowCart(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Fixed Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-forest-luxe to-deep-teal text-ivory-premium w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
      >
        <ShoppingBag className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-champagne-gold text-charcoal-noir w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Hero Section - Simplified Banner */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={collection.image}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {collection.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-soft-taupe/20 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-charcoal-noir font-semibold">
                {products.length} Products
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop Grid Options */}
              <div className="hidden md:flex items-center gap-2 border-r border-soft-taupe/20 pr-4">
                <span className="text-sm text-soft-taupe mr-2">Grid:</span>
                <button
                  onClick={() => setGridCols(2)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    gridCols === 2
                      ? 'bg-forest-luxe text-white'
                      : 'bg-gray-100 text-charcoal-noir hover:bg-gray-200'
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    gridCols === 3
                      ? 'bg-forest-luxe text-white'
                      : 'bg-gray-100 text-charcoal-noir hover:bg-gray-200'
                  }`}
                >
                  3
                </button>
              </div>

              {/* Mobile View Toggle */}
              <div className="md:hidden flex items-center gap-2 border-r border-soft-taupe/20 pr-4">
                <button
                  onClick={() => setMobileView('carousel')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    mobileView === 'carousel'
                      ? 'bg-forest-luxe text-white'
                      : 'bg-gray-100 text-charcoal-noir'
                  }`}
                >
                  Carousel
                </button>
                <button
                  onClick={() => setMobileView('grid')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    mobileView === 'grid'
                      ? 'bg-forest-luxe text-white'
                      : 'bg-gray-100 text-charcoal-noir'
                  }`}
                >
                  Grid
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-soft-taupe/30 rounded text-sm focus:border-forest-luxe focus:outline-none bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/Carousel */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Mobile Carousel */}
        <div className={`md:hidden ${mobileView === 'carousel' ? 'block' : 'hidden'}`}>
          <div className="overflow-x-auto scrollbar-hide -mx-4">
            <div className="flex gap-4 px-4 pb-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img 
                      src={product.images.nodes[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.compareAtPriceRange && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        SALE
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-champagne-gold text-champagne-gold" />
                      ))}
                      <span className="text-xs text-soft-taupe ml-1">(247)</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-forest-luxe mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold text-charcoal-noir">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                      {product.compareAtPriceRange && (
                        <span className="text-sm text-soft-taupe line-through">
                          ${parseFloat(product.compareAtPriceRange.minVariantPrice.amount).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full bg-forest-luxe text-white py-2.5 rounded font-medium text-sm hover:bg-deep-teal transition-all"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className={`md:hidden ${mobileView === 'grid' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img 
                    src={product.images.nodes[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.compareAtPriceRange && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-champagne-gold text-champagne-gold" />
                    ))}
                  </div>

                  <h3 className="font-serif text-sm font-bold text-forest-luxe mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-lg font-bold text-charcoal-noir">
                      ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                    {product.compareAtPriceRange && (
                      <span className="text-xs text-soft-taupe line-through">
                        ${parseFloat(product.compareAtPriceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="w-full bg-forest-luxe text-white py-2 rounded font-medium text-xs hover:bg-deep-teal transition-all"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className={`hidden md:grid gap-6 ${
          gridCols === 2 ? 'grid-cols-2' : 'grid-cols-3'
        }`}>
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img 
                  src={product.images.nodes[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-white text-forest-luxe px-6 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-champagne-gold hover:text-white transition-all transform scale-90 group-hover:scale-100"
                  >
                    Quick View
                  </button>
                </div>

                {product.compareAtPriceRange && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold">
                    SALE
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-champagne-gold text-champagne-gold" />
                  ))}
                  <span className="text-xs text-soft-taupe ml-2">(247 reviews)</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-forest-luxe mb-3 line-clamp-2 group-hover:text-deep-teal transition-colors">
                  {product.title}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-charcoal-noir">
                    ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                  </span>
                  {product.compareAtPriceRange && (
                    <span className="text-sm text-soft-taupe line-through">
                      ${parseFloat(product.compareAtPriceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleAddToCart(product, product.variants.nodes[0], 1);
                    }}
                    className="w-full bg-forest-luxe text-white py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-deep-teal transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  
                  <Link
                    to={`/products/${product.handle}`}
                    className="block w-full text-center border-2 border-forest-luxe text-forest-luxe py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-forest-luxe hover:text-white transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
