
import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartSidebar: React.FC = () => {
  const { items, isCartOpen, closeCart, getCartTotal, getCartCount } = useCart();
  const total = getCartTotal();
  const count = getCartCount();
  
  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={closeCart}></div>
      )}
      
      <aside className={`fixed top-0 right-0 w-full max-w-md h-screen bg-card z-50 shadow-xl transform transition-transform duration-300 rounded-l-2xl border-l border-border/50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="border-b border-border/50 p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Wardrobe Vault ({count} items)</h2>
            <button 
              onClick={closeCart}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </header>
          
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-lg mb-4">Your vault is empty</p>
                <Button onClick={closeCart} variant="outline" className="rounded-xl border-[#B3F17F] text-[#B3F17F] hover:bg-[#B3F17F]/10 transition-all duration-300">
                  Browse Archive
                </Button>
              </div>
            ) : (
              items.map(item => (
                <CartItem 
                  key={item.product.id} 
                  productId={item.product.id} 
                  quantity={item.quantity}
                />
              ))
            )}
          </div>
          
          {items.length > 0 && (
            <footer className="border-t border-border/50 p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Shipping calculated at checkout</p>
              <Button asChild className="w-full rounded-xl bg-[#B3F17F] text-black hover:bg-[#B3F17F]/90 transition-all duration-300" onClick={closeCart}>
                <Link to="/checkout">
                  Secure Your Drops
                </Link>
              </Button>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
