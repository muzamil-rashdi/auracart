import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getProductById } from '../../api/productService';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(() => getProductById(id), [id]);
  const dispatch = useDispatch();
  
  // ✅ Check auth state
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(item => item.id === product?.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // ✅ Check if user is logged in
    if (!user) {
      navigate("/login");
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const handleToggleFavorite = () => {
    // ✅ Check if user is logged in
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-center max-w-md mx-auto">
        <p className="font-bold">Error Loading Product</p>
        <p>{error.message}</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to Products
        </Button>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Product not found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>
          Back to Products
        </Button>
      </div>
    </div>
  );

  // Create multiple image array for demonstration (in real app, you might have multiple images)
  const productImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex items-center justify-center">
            <img 
              src={productImages[selectedImage]} 
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-white dark:bg-gray-800 rounded-lg p-2 border-2 transition-all ${
                  selectedImage === index 
                    ? 'border-primary-500 shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-20 object-contain"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="flex text-yellow-400 text-xl">
                  {'★'.repeat(Math.round(product.rating?.rate || 0))}
                  {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>
              <div className="mx-4 h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
            </div>
            
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              ${product.price}
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
            <p>{product.description}</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-900 dark:text-white">Quantity:</span>
              <div className="flex items-center border rounded-lg dark:border-gray-600 overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 py-3 text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </Button>
              
              <Button 
                variant={isFavorite ? 'primary' : 'outline'} 
                onClick={handleToggleFavorite}
                className="py-3 text-lg"
              >
                {isFavorite ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Favorited
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Favorites
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetails;