import {defer} from '@remix-run/node';
import {useLoaderData, Link} from '@remix-run/react';
import {useState, useEffect} from 'react';
import {ChevronRight, Award, Shield, Truck, Star, Zap, Watch, ArrowRight, X, Mail, MessageCircle} from 'lucide-react';

export async function loader() {
  const collections = [
    {handle: 'ceramic', title: 'CERAMIC', subtitle: 'Timeless Elegance', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=90'},
    {handle: 'from-the-wing', title: 'FROM THE WING', subtitle: 'In The Skies', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=90'},
    {handle: 'aventurine', title: 'AVENTURINE', subtitle: 'Modern Innovation', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1200&q=90'},
    {handle: 'explore-city', title: 'BUILT TO EXPLORE', subtitle: 'The City Awaits', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=90'}
  ];

  const products = [
    {id: '1', title: 'TERRA NOVA SUMMIT', subtitle: 'Ceramic Collection', price: '4,200.00', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80'},
    {id: '2', title: 'TERRA BLUE SUMMIT', subtitle: 'Ceramic Collection', price: '4,200.00', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'},
    {id: '3', title: 'ALTITUDE MB METEOR', subtitle: 'Titanium Collection', price: '5,700.00', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80'},
    {id: '4', title: 'ALTITUDE MB METEOR', subtitle: 'Leather Strap', price: '5,300.00', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80'}
  ];

  const heroSections = [
    {title: 'CERAMIC', subtitle: 'Timeless Elegance in Every Detail', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=90', cta: 'DISCOVER COLLECTION'},
    {title: 'FROM THE WING', subtitle: 'In The Skies', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&q=90', cta: 'EXPLORE NOW'},
    {title: 'AVENTURINE', subtitle: 'Modern Innovation Meets Tradition', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1600&q=90', cta: 'VIEW COLLECTION'},
    {title: 'BUILT TO EXPLORE', subtitle: 'The City Awaits Your Adventure', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1600&q=90', cta: 'SHOP NOW'}
  ];

  return defer({
    collections,
    products,
    heroSections
  });
}

function EmailPopup({isOpen, onClose}) {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-ivory-premium max-w-md w-full shadow-2xl transform animate-slideUp">
        <div className="relative bg-gradient-to-br from-forest-luxe to-deep-teal p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-ivory-premium/80 hover:text-ivory-premium transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="text-center text-ivory-premium">
            <div className="w-16 h-16 bg-champagne-gold/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-champagne-gold" />
            </div>
            <h3 className="font-serif text-3xl font-bold mb-2">KEEP ME UPDATED</h3>
            <p className="text-champagne-gold">Stay up to date with Vastara</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <p className="text-charcoal-noir mb-6 text-center text-sm">Be the first to hear about exclusive events and new releases.</p>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full px-4 py-3 border border-soft-taupe/30 focus:border-forest-luxe focus:outline-none transition-colors" />
            <button type="submit" className="w-full bg-charcoal-noir text-ivory-premium py-3 font-semibold uppercase tracking-wide hover:bg-forest-luxe transition-all">SIGNUP</button>
          </div>
          <p className="text-xs text-soft-taupe text-center mt-6">By signing up, you agree to receive marketing emails.</p>
        </form>
      </div>
    </div>
  );
}

export default function Homepage() {
  const {collections, products, heroSections} = useLoaderData();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-ivory-premium">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
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

      <EmailPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

      {/* Full-Screen Hero Sections */}
      {heroSections.map((section, idx) => (
        <section key={idx} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center text-ivory-premium px-6 max-w-4xl animate-slideInLeft">
            <p className="text-champagne-gold text-sm font-bold uppercase tracking-widest mb-4">COLLECTION {idx + 1}</p>
            <h1 className="font-serif text-7xl md:text-8xl font-bold mb-4 leading-tight">{section.title}</h1>
            <p className="text-2xl md:text-3xl font-light mb-8 text-ivory-premium/90">{section.subtitle}</p>
            <Link to="#" className="inline-block bg-champagne-gold text-charcoal-noir px-12 py-4 font-semibold uppercase tracking-widest hover:bg-copper-metallic transition-all">
              {section.cta}
            </Link>
          </div>
        </section>
      ))}

      {/* Featured Product Showcase - 2 Column Layout */}
      <section className="bg-ivory-premium py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.slice(0, 2).map((product) => (
              <div key={product.id} className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-[500px] overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-ivory-premium">
                  <p className="text-champagne-gold text-sm font-bold uppercase tracking-widest mb-2">{product.subtitle}</p>
                  <h3 className="font-serif text-4xl font-bold mb-4">{product.title}</h3>
                  <p className="text-2xl font-bold mb-6">${product.price}</p>
                  <Link to="#" className="inline-block bg-champagne-gold text-charcoal-noir px-8 py-3 font-semibold uppercase tracking-wider hover:bg-copper-metallic transition-all">
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEALTH MODE Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal-noir">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1526045478516-99145907023c?w=1600&q=90" alt="Stealth" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 text-center text-ivory-premium px-6 max-w-4xl">
          <p className="text-champagne-gold text-sm font-bold uppercase tracking-widest mb-4">INNOVATION</p>
          <h2 className="font-serif text-7xl md:text-8xl font-bold mb-4">STEALTH MODE</h2>
          <p className="text-3xl font-light mb-8 text-champagne-gold">ACTIVATED</p>
          <Link to="#" className="inline-block bg-champagne-gold text-charcoal-noir px-12 py-4 font-semibold uppercase tracking-widest hover:bg-copper-metallic transition-all">
            DISCOVER TECHNOLOGY
          </Link>
        </div>
      </section>

      {/* ALTITUDE Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1600&q=90" alt="Altitude" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-ivory-premium px-6 max-w-4xl">
          <p className="text-champagne-gold text-sm font-bold uppercase tracking-widest mb-4">PREMIUM COLLECTION</p>
          <h2 className="font-serif text-7xl md:text-8xl font-bold mb-4">ALTITUDE MB</h2>
          <p className="text-2xl font-light mb-8">METEOR</p>
          <Link to="#" className="inline-block bg-champagne-gold text-charcoal-noir px-12 py-4 font-semibold uppercase tracking-widest hover:bg-copper-metallic transition-all">
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      {/* 4 Product Grid */}
      <section className="bg-ivory-premium py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-champagne-gold text-sm font-bold uppercase tracking-widest mb-3">NEW COLLECTION</p>
            <h2 className="font-serif text-5xl font-bold text-charcoal-noir mb-4">LATEST RELEASES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group bg-white shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-champagne-gold text-charcoal-noir px-3 py-1 text-xs font-bold">NEW</div>
                </div>
                <div className="p-6">
                  <p className="text-soft-taupe text-xs uppercase tracking-widest mb-2">{product.subtitle}</p>
                  <h3 className="font-serif text-lg font-bold text-charcoal-noir mb-4">{product.title}</h3>
                  <p className="text-2xl font-bold text-charcoal-noir mb-6">${product.price}</p>
                  <Link to="#" className="block w-full text-center bg-charcoal-noir text-ivory-premium py-3 font-semibold uppercase tracking-wider hover:bg-forest-luxe transition-all">
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-[500px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=90" alt="Featured" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-copper-metallic text-sm font-bold uppercase tracking-widest mb-3">FEATURED ARTICLE</p>
              <h2 className="font-serif text-5xl font-bold text-charcoal-noir mb-6">THE FREEDOM OF FLIGHT</h2>
              <p className="text-soft-taupe text-lg leading-relaxed mb-8">
                Discover the stories behind our collections. Each timepiece carries a narrative of innovation, heritage, and the relentless pursuit of excellence in Swiss watchmaking.
              </p>
              <Link to="#" className="inline-block border-2 border-charcoal-noir text-charcoal-noir px-8 py-3 font-semibold uppercase tracking-wide hover:bg-charcoal-noir hover:text-ivory-premium transition-all">
                READ FULL ARTICLE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-ivory-premium py-16 border-t border-b border-soft-taupe/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {icon: Watch, title: 'SWISS MOVEMENT', desc: 'Authentic automatic calibers'},
              {icon: Shield, title: 'LIFETIME WARRANTY', desc: 'Full coverage guaranteed'},
              {icon: Truck, title: 'FREE SHIPPING', desc: 'Worldwide delivery included'},
              {icon: Award, title: 'PREMIUM MATERIALS', desc: 'Luxury crafted with care'}
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <item.icon className="w-12 h-12 text-champagne-gold mx-auto mb-4" />
                <h3 className="font-semibold text-charcoal-noir uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-soft-taupe text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-ivory-premium py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-copper-metallic text-sm font-bold uppercase tracking-widest mb-3">STAY CONNECTED</p>
          <h2 className="font-serif text-5xl font-bold text-charcoal-noir mb-6">KEEP ME UPDATED</h2>
          <p className="text-soft-taupe text-lg mb-12 max-w-2xl mx-auto">Be the first to hear about exclusive events, new releases, and special offers.</p>
          <form className="max-w-md mx-auto mb-12">
            <div className="mb-4">
              <input type="email" placeholder="Your email address" className="w-full px-4 py-4 border border-soft-taupe/30 focus:border-forest-luxe focus:outline-none transition-colors" required />
            </div>
            <button type="submit" className="w-full bg-charcoal-noir text-ivory-premium py-4 font-semibold uppercase tracking-wide hover:bg-forest-luxe transition-all">SIGNUP</button>
          </form>
          <div className="flex items-center justify-center gap-12">
            <div className="flex flex-col items-center">
              <Mail className="w-6 h-6 text-champagne-gold mb-2" />
              <span className="text-charcoal-noir font-semibold uppercase text-xs">LATEST NEWS</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-6 h-6 text-champagne-gold mb-2" />
              <span className="text-charcoal-noir font-semibold uppercase text-xs">EXCLUSIVE OFFERS</span>
            </div>
            <div className="flex flex-col items-center">
              <Watch className="w-6 h-6 text-champagne-gold mb-2" />
              <span className="text-charcoal-noir font-semibold uppercase text-xs">NEW RELEASES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-charcoal-noir py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-5xl font-bold text-ivory-premium mb-4">NEED A HAND?</h2>
          <p className="text-ivory-premium/70 mb-12 max-w-2xl mx-auto">We're available 10am - 5pm EST Mon - Sat via chat, email, or phone.</p>
          <div className="flex items-center justify-center gap-12">
            <button className="flex flex-col items-center group">
              <div className="w-16 h-16 border-2 border-ivory-premium/30 rounded-full flex items-center justify-center mb-3 group-hover:border-champagne-gold transition-colors">
                <MessageCircle className="w-7 h-7 text-ivory-premium group-hover:text-champagne-gold transition-colors" />
              </div>
              <span className="text-ivory-premium text-sm font-semibold uppercase">CHAT</span>
            </button>
            <button className="flex flex-col items-center group">
              <div className="w-16 h-16 border-2 border-ivory-premium/30 rounded-full flex items-center justify-center mb-3 group-hover:border-champagne-gold transition-colors">
                <Mail className="w-7 h-7 text-ivory-premium group-hover:text-champagne-gold transition-colors" />
              </div>
              <span className="text-ivory-premium text-sm font-semibold uppercase">EMAIL</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-soft-taupe/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-serif text-lg font-bold text-champagne-gold mb-4">VASTARA</h3>
              <p className="text-ivory-premium/60 text-sm">Swiss luxury watches crafted with precision and passion.</p>
            </div>
            <div>
              <h4 className="text-ivory-premium font-semibold uppercase tracking-wide mb-4">Collections</h4>
              <ul className="space-y-2 text-ivory-premium/60 text-sm">
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">New Arrivals</Link></li>
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Ceramic</Link></li>
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Aventurine</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-ivory-premium font-semibold uppercase tracking-wide mb-4">Support</h4>
              <ul className="space-y-2 text-ivory-premium/60 text-sm">
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Warranty</Link></li>
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-ivory-premium font-semibold uppercase tracking-wide mb-4">Legal</h4>
              <ul className="space-y-2 text-ivory-premium/60 text-sm">
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-champagne-gold transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-soft-taupe/20 pt-8 text-center text-ivory-premium/60 text-sm">
            <p>&copy; 2025 VASTARA. All rights reserved. Swiss Made Luxury Watches.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
