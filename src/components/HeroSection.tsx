
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[85vh] overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2070&q=80" 
          alt="Fashion hero"
          className="w-full h-full object-cover rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black/20 rounded-b-3xl"></div>
      </div>
      
      <div className="container relative z-10 h-full flex flex-col justify-center text-white">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#4ED3E0]">
            Fit Archive
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
          Tailored luxury — powered by intelligent fitting technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-[#4ED3E0] text-black hover:bg-[#4ED3E0]/90 rounded-xl transition-all duration-300">
              <Link to="/shop">
                Browse Collections
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#4ED3E0] text-[#4ED3E0] hover:bg-[#4ED3E0]/10 rounded-xl backdrop-blur transition-all duration-300">
              <Link to="/shop">
                <span className="flex items-center">
                  Snap Your Fit
                  <span className="ml-2 text-xs bg-[#4ED3E0]/20 px-2 py-0.5 rounded-full">Coming Soon</span>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
