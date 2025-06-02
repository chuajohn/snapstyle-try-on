
import React, { useMemo } from 'react';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, typeof products> = {
      'Streetwear': [],
      'Summer Fits': [],
      'Minimalist': [],
    };
    
    // Map actual categories to our themed categories
    const categoryMapping: Record<string, string> = {
      'tops': Math.random() > 0.5 ? 'Streetwear' : 'Summer Fits',
      'bottoms': Math.random() > 0.5 ? 'Streetwear' : 'Minimalist',
      'outerwear': 'Streetwear',
      'shoes': 'Streetwear',
      'accessories': 'Minimalist',
    };
    
    products.forEach(product => {
      const themeCategory = categoryMapping[product.category] || 'Minimalist';
      grouped[themeCategory].push(product);
    });
    
    return grouped;
  }, []);
  
  return (
    <main className="container py-12 bg-[#1D1F23]/70 text-[#F2F2F2]">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-3 text-[#B3F17F]">Style Collections</h1>
        <p className="text-muted-foreground max-w-xl">Discover curated pieces that define your personal style. Each collection is thoughtfully assembled to inspire your next favorite outfit.</p>
      </header>
      
      {Object.entries(productsByCategory).map(([category, items]) => (
        items.length > 0 && (
          <section key={category} className="mb-16">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="text-2xl font-semibold text-[#F2F2F2]">{category}</h2>
              <span className="text-sm text-muted-foreground">{items.length} items</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )
      ))}
      
      <section className="mt-20 py-16 px-8 bg-[#252830] rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#B3F17F]">Snap Your Fit</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Soon you'll be able to upload your outfit and get smart style suggestions instantly. 
          Perfect matches, every time.
        </p>
        <button 
          className="px-8 py-4 bg-[#1D1F23] rounded-xl text-[#B3F17F]/70 cursor-not-allowed 
                   flex items-center mx-auto space-x-2 hover:bg-[#252830] transition-colors border border-[#B3F17F]/30"
          disabled
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <span>Coming Soon</span>
        </button>
      </section>
    </main>
  );
};

export default Shop;
