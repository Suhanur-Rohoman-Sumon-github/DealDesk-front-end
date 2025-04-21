"use client";

import ProductCard from "@/components/marketplace/ProductCard";

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    category: "Shoes",
    price: "$129.99",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Apple AirPods Pro",
    category: "Electronics",
    price: "$249.99",
    image:
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Samsung Galaxy S25",
    category: "Electronics",
    price: "$1099.99",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Kindle Paperwhite",
    category: "Electronics",
    price: "$139.99",
    image:
      "https://images.unsplash.com/photo-1594909056133-7b18878b04d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Bose QuietComfort Headphones",
    category: "Electronics",
    price: "$329.99",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e1822c36a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Dyson V12 Vacuum",
    category: "Home",
    price: "$599.99",
    image:
      "https://images.unsplash.com/photo-1584946454211-77ed7669795f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
];

const Favorites = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
        <p className="text-muted-foreground">Products you have saved for later</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
