
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const Navbar: React.FC = () => {
  const { toggleCart, getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="border-b border-border/30 bg-card/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#B3F17F]">SNAPSTYLE</Link>
        
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-sm font-medium hover:text-[#B3F17F] transition-colors">
            FIT ARCHIVE
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-[#B3F17F] transition-colors">
            SHOP
          </Link>
          <Link to="/try-on" className="text-sm font-medium hover:text-[#B3F17F] transition-colors">
            TRY
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleCart}
            className="relative flex items-center hover:text-[#B3F17F] transition-colors"
            aria-label="Wardrobe Vault"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B3F17F] text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="md:hidden">
            <button className="p-1" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
