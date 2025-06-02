
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "EVA-01 Technical Tee",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "tops",
    description: "Limited edition graphic tee inspired by Evangelion Unit-01 color scheme with technical details.",
    featured: true
  },
  {
    id: 2,
    name: "Neo-Tokyo Cargo Pants",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "bottoms",
    description: "Cyberpunk-inspired tactical cargos with multiple utility pockets and reflective detailing.",
    featured: true
  },
  {
    id: 3,
    name: "Akira Capsule Jacket",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "outerwear",
    description: "Premium outerwear inspired by Neo-Tokyo with iconic red detailing and pill-shaped embroidery.",
    featured: true
  },
  {
    id: 4,
    name: "Margiela Replica Low",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "shoes",
    description: "Classic luxury low-top sneakers in premium black leather with signature stitching.",
    featured: true
  },
  {
    id: 5,
    name: "Fragment Design Work Shirt",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "tops",
    description: "Collaborative piece featuring minimalist detailing and lightning bolt motifs on premium cotton."
  },
  {
    id: 6,
    name: "Godspeed Evangelion Trousers",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "bottoms",
    description: "Water-resistant high-function trousers with articulated knees and hidden pocket system."
  },
  {
    id: 7,
    name: "Mecha-Inspired Knit",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "tops",
    description: "Premium wool blend sweater with robot-inspired panel design and metallic thread details."
  },
  {
    id: 8,
    name: "Tactical Utility Holster",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "accessories",
    description: "Modular chest rig inspired by cyberpunk aesthetics, perfect for daily essentials."
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
