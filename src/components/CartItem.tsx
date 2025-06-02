
import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  productId: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity }) => {
  const { items, updateQuantity, removeItem } = useCart();
  const item = items.find(item => item.product.id === productId);
  
  if (!item) return null;
  
  const { product } = item;
  
  return (
    <div className="flex items-start gap-4 py-4 border-b last:border-0">
      <div className="w-20 h-24 bg-gray-100 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <button 
            onClick={() => removeItem(product.id)}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
        
        <div className="flex items-center mt-4">
          <button 
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border border-r-0 hover:bg-gray-100 transition-colors"
          >
            <Minus size={14} />
          </button>
          
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 h-8 border text-center text-sm"
          />
          
          <button 
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-l-0 hover:bg-gray-100 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
