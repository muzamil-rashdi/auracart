import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getProducts } from '../../api/productService';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: products, loading, error } = useFetch(getProducts);

  if (loading) return <div className="flex justify-center py-8"><Loader size="lg" /></div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  // Get unique categories
  const categories = [...new Set(products?.map(product => product.category) || [])];

  // Filter products based on search and category
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Products</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
                w-full md:max-w-xs px-4 py-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-primary-500
                border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
            "
            />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No products found. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

export default Home;