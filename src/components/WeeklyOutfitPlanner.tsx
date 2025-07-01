
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

// Dummy data for outfit items 
const outfitItems = {
  topwear: [
    { id: 1, name: "EVA-01 Technical Tee", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Neo-Tokyo Graphic Shirt", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 3, name: "Anime Villain Hoodie", image: "https://images.unsplash.com/photo-1556172817-5eb814fbca38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
  ],
  outerwear: [
    { id: 1, name: "Akira Capsule Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Mecha-Inspired Coat", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 3, name: "Fragment Design Bomber", image: "https://images.unsplash.com/photo-1495105787522-2e9c9586dee3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
  ],
  bottomwear: [
    { id: 1, name: "Tech Cargo Pants", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Cyberpunk Joggers", image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 3, name: "Techwear Utility Shorts", image: "https://images.unsplash.com/photo-1550639524-a6f58345a2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
  ],
  footwear: [
    { id: 1, name: "Margiela Replica Lows", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Tactical Combat Boots", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { id: 3, name: "Fragment × Nike Highs", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
  ],
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const OutfitItemSlot: React.FC<{ category: string; day: string }> = ({ category, day }) => {
  const items = outfitItems[category as keyof typeof outfitItems];
  
  return (
    <div className="mb-4">
      <p className="outfit-category">{category}</p>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="outfit-item-slot cursor-pointer">
            <p className="text-sm text-center text-muted-foreground opacity-60">
              Select {category}
            </p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="bg-card border-border w-64 p-1">
          <div className="grid grid-cols-3 gap-1">
            {items.map(item => (
              <div 
                key={item.id}
                className="aspect-square p-1 rounded hover:bg-secondary cursor-pointer transition-colors"
                title={item.name}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

const WeeklyOutfitPlanner: React.FC = () => {
  return (
    <section className="container py-16 my-12">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Weekly Outfit Planner</h2>
        <p className="text-muted-foreground">Set your looks for the week ahead. Click any slot to browse items.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map(day => (
          <div key={day} className="day-column">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#4ED3E0] rounded-full mr-2"></span>
              {day}
            </h3>
            
            <OutfitItemSlot category="topwear" day={day} />
            <OutfitItemSlot category="outerwear" day={day} />
            <OutfitItemSlot category="bottomwear" day={day} />
            <OutfitItemSlot category="footwear" day={day} />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-[#4ED3E0]/20 text-[#4ED3E0] rounded-xl hover:bg-[#4ED3E0]/30 transition-colors border border-[#4ED3E0]/30">
          Save Weekly Plan
        </button>
      </div>
    </section>
  );
};

export default WeeklyOutfitPlanner;
