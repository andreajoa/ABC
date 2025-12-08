import {defer} from '@remix-run/node';
import {useLoaderData, Link} from '@remix-run/react';
import {useState} from 'react';
import {Star, Heart, Share2, ChevronDown, Shield, Truck, RotateCcw, Award, Check, Minus, Plus, ShoppingBag} from 'lucide-react';

export async function loader({params}) {
  const {handle} = params;
  
  const mockProduct = {
    id: '1',
    title: 'ADRENALINE',
    subtitle: 'The only watch you\'ll ever need',
    handle: handle,
    price: '899.00',
    compareAtPrice: '1299.00',
    description: 'Built on 300m water-resistant design, this is where versatility meets style',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80'
    ],
    variants: [
      {id: '1', title: 'Silver/Black Leather', price: '899.00', available: true},
      {id: '2', title: 'Gold/Blue Leather', price: '949.00', available: true},
      {id: '3', title: 'Rose Gold/Brown Leather', price: '929.00', available: true}
    ],
    features: [
      {icon: '⚡', title: 'Effortless style', desc: 'Versatile enough for any occasion, from a business meeting to your most casual weekend.'},
      {icon: '🔧', title: 'Precision engineering', desc: 'Built to last with Swiss automatic movement and premium materials.'},
      {icon: '💼', title: 'Built to last', desc: 'Water-resistant to 300m with sapphire crystal and stainless steel construction.'},
      {icon: '⏱️', title: 'Your style, our timepiece', desc: 'Multiple strap options and finishes to match your personal style.'}
    ],
    testimonials: [
      {name: 'John S.', verified: true, rating: 5, text: 'This watch exceeded all my expectations. The build quality is outstanding and it looks even better in person. I\'ve received countless compliments.'},
      {name: 'Jessica L.', verified: true, rating: 5, text: 'Absolutely stunning timepiece. The attention to detail is remarkable and it\'s incredibly comfortable to wear all day long.'},
      {name: 'Greg J.', verified: true, rating: 5, text: 'Best watch purchase I\'ve ever made. The automatic movement is smooth and the weight feels premium without being too heavy.'},
      {name: 'Emily R.', verified: true, rating: 5, text: 'I love everything about this watch - the design, the quality, the packaging. Vastara has earned a customer for life.'},
      {name: 'David M.', verified: true, rating: 5, text: 'Exceptional value for money. This rivals watches that cost three times as much. The craftsmanship is truly impressive.'},
      {name: 'Chris K.', verified: true, rating: 5, text: 'Versatile enough to wear with a suit or jeans. The leather strap is incredibly soft and the watch face is perfectly sized.'}
    ]
  };

  return defer({product: mockProduct});
}

export default function ProductPage() {
  const {product} = useLoaderData();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const savings = (parseFloat(product.compareAtPrice) - parseFloat(product.price)).toFixed(2);
  const savingsPercent = Math.round((savings / parseFloat(product.compareAtPrice)) * 100);

  const faqs = [
    {q: 'Is this watch suitable for everyday wear?', a: 'Yes! The ADRENALINE is designed for versatility. It\'s water-resistant to 300m, has a scratch-resistant sapphire crystal, and features a durable stainless steel case.'},
    {q: 'What makes Vastara\'s ADRENALINE stand out?', a: 'Premium Swiss automatic movement, 300m water resistance, sapphire crystal, and exceptional build quality at an accessible price point.'},
    {q: 'How does the Vastara ADRENALINE compare to luxury brands?', a: 'Our watches rival brands like Omega and Tag Heuer in quality and craftsmanship, but at a fraction of the price thanks to our direct-to-consumer model.'},
    {q: 'Is the strap ADRENALINE fit my wrist size?', a: 'The leather strap fits wrists from 6.5" to 8.5". We also offer additional holes and extension links for the perfect fit.'},
    {q: 'Is it watch CLASP fully adjustable for any wrist?', a: 'Yes, the clasp features micro-adjustment holes and our customer service can help you achieve the perfect fit.'},
    {q: 'What if I don\'t like it? What\'s the return policy?', a: '60-day money-back guarantee. If you\'re not completely satisfied, return it for a full refund, no questions asked.'}
  ];

  return (
    <div className="bg-ivory-premium min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');
        
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        .bg-forest-luxe { background-color: #0a3d2f; }
        .bg-champagne-gold { background-color: #d4af69; }
        .bg-ivory-premium { background-color: #fefdf8; }
        .bg-deep-teal { background-color: #1a5757; }
        .bg-copper-metallic { background-color: #b87333; }
        .bg-charcoal-noir { background-color: #2a2a2a; }
        .bg-soft-taupe { background-color: #9d8b7c; }
        
        .text-forest-luxe { color: #0a3d2f; }
        .text-champagne-gold { color: #d4af69; }
        .text-ivory-premium { color: #fefdf8; }
        .text-deep-teal { color: #1a5757; }
        .text-copper-metallic { color: #b87333; }
        .text-charcoal-noir { color: #2a2a2a; }
        .text-soft-taupe { color: #9d8b7c; }
        
        .border-champagne-gold { border-color: #d4af69; }
        .border-forest-luxe { border-color: #0a3d2f; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-soft-taupe mb-6">
          <Link to="/" className="hover:text-forest-luxe">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collections/all" className="hover:text-forest-luxe">Watches</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal-noir">{product.title}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative bg-gray-50 aspect-square overflow-hidden">
              <img 
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center hover:bg-champagne-gold transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square border-2 overflow-hidden ${
                    selectedImage === idx ? 'border-forest-luxe' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-copper-metallic text-sm font-bold uppercase tracking-wider mb-2">
                Vastara Watches
              </p>
              <h1 className="font-serif text-5xl font-bold text-charcoal-noir mb-3">
                {product.title}
              </h1>
              <p className="text-2xl text-forest-luxe font-semibold mb-4">
                {product.subtitle}
              </p>
              <p className="text-soft-taupe leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
                ))}
              </div>
              <span className="text-sm text-soft-taupe">(1,247 reviews)</span>
            </div>

            <div className="bg-green-50 border border-green-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <span className="text-lg text-soft-taupe line-through">${product.compareAtPrice}</span>
                <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold">
                  SAVE {savingsPercent}%
                </span>
              </div>
              <p className="text-sm text-green-700">
                🎉 Limited time offer - Save ${savings} today!
              </p>
            </div>

            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-semibold text-charcoal-noir mb-3">
                Choose your style
              </label>
              <div className="space-y-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`w-full p-4 border-2 text-left transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-forest-luxe bg-forest-luxe/5'
                        : 'border-gray-200 hover:border-soft-taupe'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-charcoal-noir">{variant.title}</span>
                      <span className="text-forest-luxe font-bold">${variant.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-charcoal-noir mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-soft-taupe/30 flex items-center justify-center hover:border-forest-luxe transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold text-charcoal-noir w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-soft-taupe/30 flex items-center justify-center hover:border-forest-luxe transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-gradient-to-r from-forest-luxe to-deep-teal text-ivory-premium py-4 font-semibold text-lg uppercase tracking-wide hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Add to Cart - ${(parseFloat(selectedVariant.price) * quantity).toFixed(2)}
            </button>

            <button className="w-full border-2 border-forest-luxe text-forest-luxe py-4 font-semibold text-lg uppercase tracking-wide hover:bg-forest-luxe hover:text-ivory-premium transition-all flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-soft-taupe/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-champagne-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-charcoal-noir">Lifetime Warranty</p>
                  <p className="text-xs text-soft-taupe">We stand behind quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-champagne-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-charcoal-noir">Free Shipping</p>
                  <p className="text-xs text-soft-taupe">Worldwide delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-champagne-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-charcoal-noir">60-Day Returns</p>
                  <p className="text-xs text-soft-taupe">Money-back guarantee</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-champagne-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-charcoal-noir">Premium Quality</p>
                  <p className="text-xs text-soft-taupe">Swiss movement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your watch, your way */}
        <section className="mb-16 bg-white p-12">
          <h2 className="font-serif text-4xl font-bold text-center text-charcoal-noir mb-12">
            Your watch, your way
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {img: product.images[0], title: 'For the work dress', desc: 'Pairs perfectly with formal attire. The elegant design and premium finish make it ideal for business meetings and professional settings.'},
              {img: product.images[1], title: 'Casual refinement', desc: 'Versatile enough for weekend wear. The comfortable leather strap and timeless design complement any casual outfit.'},
              {img: product.images[2], title: 'Sport Companion', desc: 'Built for adventure with 300m water resistance. Whether you\'re diving, swimming, or hiking, this watch keeps up with your active lifestyle.'}
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="aspect-square bg-gray-50 mb-4 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-noir mb-2">{item.title}</h3>
                <p className="text-soft-taupe leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-noir mb-3">{feature.title}</h3>
                <p className="text-soft-taupe leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Versatility Section */}
        <section className="mb-16 bg-white p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-charcoal-noir mb-6">
                Your Vastara, your way
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {product.images.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-50">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-soft-taupe leading-relaxed mb-6">
                Multiple strap options and case finishes allow you to personalize your ADRENALINE to match your unique style. From classic leather to modern metal bracelets, find the perfect combination.
              </p>
              <Link to="/collections/all" className="inline-block border-2 border-charcoal-noir text-charcoal-noir px-8 py-3 font-semibold uppercase tracking-wide hover:bg-charcoal-noir hover:text-ivory-premium transition-all">
                SHOP YOUR STYLE
              </Link>
            </div>
            <div className="aspect-square bg-gray-50">
              <img src={product.images[3]} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Effortless style */}
        <section className="mb-16">
          <div className="bg-pink-50 p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold text-charcoal-noir mb-6">
                  Effortless style, every moment.
                </h2>
                <p className="text-soft-taupe leading-relaxed mb-6">
                  From morning meetings to evening events, the ADRENALINE adapts to every occasion. Its versatile design means you'll never need to change your watch - it's always the perfect choice.
                </p>
                <button className="border-2 border-charcoal-noir text-charcoal-noir px-8 py-3 font-semibold uppercase tracking-wide hover:bg-charcoal-noir hover:text-ivory-premium transition-all">
                  SHOP YOUR STYLE
                </button>
              </div>
              <div className="aspect-square bg-gray-50">
                <img src={product.images[4]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Elevate your wrist */}
        <section className="mb-16 bg-white p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-charcoal-noir">
                elevate your wrist
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 border-2 border-champagne-gold flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal-noir mb-2">effortless style</h3>
                    <p className="text-soft-taupe">Whether you're in the boardroom or at brunch, the ADRENALINE complements every outfit and occasion with refined elegance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 border-2 border-champagne-gold flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal-noir mb-2">built to impress</h3>
                    <p className="text-soft-taupe">Premium Swiss automatic movement ensures accurate timekeeping while the sapphire crystal and stainless steel construction guarantee lasting beauty.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 border-2 border-champagne-gold flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal-noir mb-2">master your day</h3>
                    <p className="text-soft-taupe">From morning swim to evening dinner, this watch is your reliable companion. Water-resistant to 300m and built to last a lifetime.</p>
                  </div>
                </div>
              </div>

              <button className="w-full border-2 border-charcoal-noir text-charcoal-noir px-8 py-4 font-semibold uppercase tracking-wide hover:bg-charcoal-noir hover:text-ivory-premium transition-all">
                SHOP YOUR STYLE
              </button>
            </div>

            <div className="aspect-square bg-gray-50">
              <img src={product.images[5]} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-charcoal-noir mb-4">
              Why our customers love us
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-champagne-gold text-champagne-gold" />
              ))}
              <span className="text-2xl font-bold text-charcoal-noir ml-2">4.9/5</span>
            </div>
            <p className="text-soft-taupe">Based on 1,247+ verified reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.testimonials.map((review, idx) => (
              <div key={idx} className="bg-yellow-50 p-6 border border-yellow-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
                  ))}
                </div>
                <p className="text-charcoal-noir mb-4 leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-charcoal-noir">{review.name}</p>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 bg-white p-12">
          <h2 className="font-serif text-4xl font-bold text-center text-charcoal-noir mb-12">
            Your style questions, answered.
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-soft-taupe/20">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 flex items-center justify-between text-left hover:text-forest-luxe transition-colors"
                >
                  <span className="font-semibold text-charcoal-noir pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="pb-4 text-soft-taupe leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-forest-luxe to-deep-teal p-12 text-center text-ivory-premium">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Ready to elevate your style?
            </h2>
            <p className="text-xl text-champagne-gold mb-8">
              Join thousands of satisfied customers worldwide
            </p>
            <button className="bg-ivory-premium text-forest-luxe px-12 py-4 font-semibold text-lg uppercase tracking-wide hover:bg-champagne-gold hover:text-charcoal-noir transition-all">
              ADD TO CART - ${product.price}
            </button>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>60-Day Returns</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
