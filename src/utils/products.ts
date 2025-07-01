
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
    name: "Carhartt x Sacai Reversable Duck Jacket",
    price: 1776.00,
    image: "https://cdn-img.poizonapp.com/pro-img/cut-img/20240220/23f2209750d348e0abc368a5ad6ff456.jpg?x-oss-process=image/format,webp/resize,w_800,h_800",
    category: "tops",
    description: "A hybrid of Carhartt WIP's OG Chore Coat and Siberian Parka.",
    featured: true
  },
  {
    id: 2,
    name: "GU Pleated Wide-Leg Pants",
    price: 39.90,
    image: "https://image.uniqlo.com/GU/ST3/WesternCommon/imagesgoods/351357/sub/goods_351357_sub52_3x4.jpg?width=600",
    category: "bottoms",
    description: "A pair of wide-leg pants, made from a two-way stretch fabric with wrinkle-resistant properties for easy care.",
    featured: true
  },
  {
    id: 3,
    name: "Michael Kors Biker Jacket",
    price: 663.00,
    image: "https://cdn.luxe.digital/media/20230522141942/best-leather-jackets-men-michael-kors-luxe-digital-1.jpg.webp",
    category: "outerwear",
    description: "Black lamb skin mock-neck biker jacket from Michael Kors featuring stitched panels, a mock neck, long sleeves, front zipped pockets, a two way zip fastening and a monogram printed lining.",
    featured: true
  },
  {
    id: 4,
    name: "Margiela Replica Low",
    price: 449.99,
    image: "https://www.maisonmargiela.com/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-margiela-master-catalog/default/dw08f4d837/images/large/S57WS0236_P1897_900_F.jpg?sw=1024&q=80",
    category: "shoes",
    description: "Classic luxury low-top sneakers in premium black leather with signature stitching.",
    featured: true
  },
  {
    id: 5,
    name: "Uniqlo U AIRism Cotton Oversized Crew Neck Half Sleeve T-Shirt",
    price: 24.90,
    image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/455359/item/goods_67_455359_3x4.jpg?width=494",
    category: "tops",
    description: "By international designers based at our Paris Research and Development Center led by Artistic Director Christophe Lemaire."
  },
  {
    id: 6,
    name: "Pleasures x Evangelion EVA-1 Cargo Pants Black",
    price: 219.99,
    image: "https://cdna.lystit.com/1040/1300/n/photos/endclothing/793e12fb/pleasures-designer-Black-Eva-1-Cargo-Pants.jpeg",
    category: "bottoms",
    description: "Features eye-catching reflective graphics straight from the anime series. Made with durable black nylon."
  },
  {
    id: 8,
    name: "Aurélien Light Blue Suede Yacht Loafer",
    price: 410.00,
    image: "https://aurelien-online.com/cdn/shop/products/Aurelien_Yacht_Loafers_men_suede_shoes_summer_italy_lightblue3.jpg?v=1634573482&width=1200",
    category: "shoes",
    description: "Designed for sunny strolls, hence the unlined construction ensuring ultimate comfort, breathability and flexibility."
  },
  {
      id: 7,
      name: "Hajime Sorayama & Knit Gang Council Craft “Sexy Robot” Knit Sweater",
      price: 424.99,
      image: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F03%2Fknit-gang-council-hajime-sorayama-sexy-robot-crewneck-sweater-release-1.jpg?q=70&w=915&cbr=1&fit=max",
      category: "tops",
      description: "Semi-boxy fit, complemented by a fine woolen texture"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
