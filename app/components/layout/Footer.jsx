import {Link} from '@remix-run/react';
import {Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-forest-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Shop */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/all" className="text-white/80 hover:text-luxury-gold transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/collections/men" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Men's Watches
                </Link>
              </li>
              <li>
                <Link to="/collections/women" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Women's Watches
                </Link>
              </li>
              <li>
                <Link to="/collections/limited-edition" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Limited Edition
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-white/80 hover:text-luxury-gold transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Shipping Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-luxury-gold transition-colors">
                  About Vastara
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-white/80 hover:text-luxury-gold transition-colors">
                  Warranty
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/80">
                <Mail size={16} />
                <span>support@vastara.online</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone size={16} />
                <span>+1-800-VASTARA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/vastara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/vastara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/vastara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com/vastara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Shield size={16} />
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Truck size={16} />
                <span className="text-sm">Free Shipping</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <CreditCard size={20} className="text-white/60" />
              <span className="text-sm text-white/60">We accept all major credit cards</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Vastara. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

