import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const { toggleCart, getCartCount } = useCart();
  const { user, signInWithGoogle, signOut, loading } = useAuth();
  const cartCount = getCartCount();

  return (
    <nav className="border-b border-border/30 bg-card/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link
          to="/"
          className="text-3xl font-bold tracking-wider text-[#4ED3E0]"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          SNAPSTYLE
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-sm font-medium hover:text-[#4ED3E0] transition-colors">
            FIT ARCHIVE
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-[#4ED3E0] transition-colors">
            SHOP
          </Link>
          <Link to="/try-on" className="text-sm font-medium hover:text-[#4ED3E0] transition-colors">
            TRY
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={toggleCart}
            className="relative flex items-center hover:text-[#4ED3E0] transition-colors"
            aria-label="Wardrobe Vault"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#4ED3E0] text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || user.email} />
                        <AvatarFallback>
                          {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex flex-col items-start">
                      <div className="font-medium">{user.user_metadata?.full_name || 'User'}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={signInWithGoogle} variant="outline" size="sm">
                  Sign in with Google
                </Button>
              )}
            </>
          )}

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
