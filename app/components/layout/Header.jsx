import {Link} from '@remix-run/react';
import {useState} from 'react';
import {ShoppingBag, Menu, X, Search, Heart, User} from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="font-display text-3xl font-bold text-forest-green">
              VASTARA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/collections/all"
              className="text-neutral font-medium hover:text-luxury-gold transition-colors"
            >
              Collections
            </Link>
            <Link
              to="/collections/men"
              className="text-neutral font-medium hover:text-luxury-gold transition-colors"
            >
              Men
            </Link>
            <Link
              to="/collections/women"
              className="text-neutral font-medium hover:text-luxury-gold transition-colors"
            >
              Women
            </Link>
            <Link
              to="/about"
              className="text-neutral font-medium hover:text-luxury-gold transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutral font-medium hover:text-luxury-gold transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 hover:bg-cream rounded-lg transition-colors">
              <Search size={20} className="text-neutral" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 hover:bg-cream rounded-lg transition-colors"
            >
              <Heart size={20} className="text-neutral" />
            </Link>

            {/* Account */}
            <button className="p-2 hover:bg-cream rounded-lg transition-colors">
              <User size={20} className="text-neutral" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-cream rounded-lg transition-colors"
            >
              <ShoppingBag size={20} className="text-neutral" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-luxury-gold text-white text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-cream rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-neutral" />
              ) : (
                <Menu size={24} className="text-neutral" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-light/20 py-4">
            <nav className="flex flex-col gap-4">
              <Link
                to="/collections/all"
                className="text-neutral font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/collections/men"
                className="text-neutral font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/collections/women"
                className="text-neutral font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/about"
                className="text-neutral font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-neutral font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

