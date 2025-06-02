
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import WeeklyOutfitPlanner from '../components/WeeklyOutfitPlanner';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <WeeklyOutfitPlanner />
      
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="h-96 md:h-[500px] relative overflow-hidden rounded-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              alt="Evangelion Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <h3 className="text-2xl font-bold mb-2">NEO-TOKYO ESSENTIALS</h3>
                <p className="mb-4 max-w-xs">Limited edition anime-inspired pieces that blend cyberpunk aesthetics with premium materials</p>
                <Link to="/shop" className="text-sm font-medium underline text-[#B3F17F] underline-offset-4 group-hover:underline-offset-8 transition-all">
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
          
          <div className="h-96 md:h-[500px] relative overflow-hidden rounded-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              alt="Premium Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <h3 className="text-2xl font-bold mb-2">FRAGMENT CAPSULE</h3>
                <p className="mb-4 max-w-xs">High-end collaborative drops that elevate your daily rotation with collector-worthy pieces</p>
                <Link to="/shop" className="text-sm font-medium underline text-[#B3F17F] underline-offset-4 group-hover:underline-offset-8 transition-all">
                  Discover Exclusives
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 mb-16 rounded-t-3xl bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-semibold text-center mb-12 text-[#B3F17F]">Why Shop SnapStyle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-card p-8 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#B3F17F]/5 transition-all duration-300 hover:-translate-y-1 border border-border/40">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B3F17F]">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12" y2="20" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Express Delivery</h3>
              <p className="text-sm text-muted-foreground">Worldwide shipping with tracking on all orders</p>
            </div>
            
            <div className="text-center bg-card p-8 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#B3F17F]/5 transition-all duration-300 hover:-translate-y-1 border border-border/40">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B3F17F]">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Style Guarantee</h3>
              <p className="text-sm text-muted-foreground">Authenticity verified on all limited pieces</p>
            </div>
            
            <div className="text-center bg-card p-8 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#B3F17F]/5 transition-all duration-300 hover:-translate-y-1 border border-border/40">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B3F17F]">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Style Analysis</h3>
              <p className="text-sm text-muted-foreground">AI-powered outfit recommendations <span className="bg-[#B3F17F]/20 text-[#B3F17F] text-xs px-1.5 py-0.5 rounded-full ml-1">Coming Soon</span></p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="container py-16 mb-20">
        <div className="bg-secondary/40 rounded-2xl p-10 text-center relative overflow-hidden border border-border/30">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#B3F17F]">Snap Your Fit</h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
              Our AI style assistant is coming soon. Upload your outfit photo and get personalized anime-inspired luxury recommendations that match your aesthetic.
            </p>
            <button className="px-8 py-4 bg-secondary rounded-xl text-[#B3F17F]/70 cursor-not-allowed inline-flex items-center border border-[#B3F17F]/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Coming Fall 2025
            </button>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B3F17F]">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
