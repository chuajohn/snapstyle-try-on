
import React from 'react';
import { Product } from '../utils/products';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  return (
    <div className="group hover-scale bg-[#1D1F23]/70 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-[#B3F17F]/20 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="aspect-[3/4] overflow-hidden bg-[#252830] relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
          <p className="text-white text-sm font-medium max-w-[80%] line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform">
            {product.description || "Perfect addition to your wardrobe. Express your unique style."}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-base text-[#F2F2F2]">{product.name}</h3>
            <p className="text-sm text-[#B3F17F] mt-1">${product.price.toFixed(2)}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl border-[#B3F17F] text-[#B3F17F] hover:bg-[#B3F17F]/10"
          >
            Add
          </Button>
        </div>
        <div className="mt-2">
          <span className="text-xs bg-[#2A2D36] text-[#B3F17F] px-2 py-1 rounded-full">
            {product.category === 'tops' ? 'Essential' : 
             product.category === 'bottoms' ? 'Statement' : 
             product.category === 'outerwear' ? 'Seasonal' : 
             product.category === 'shoes' ? 'Footwear' : 'Accent'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
