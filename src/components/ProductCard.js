import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✅ check auth state
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      // if not logged in → redirect to login
      navigate("/login");
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
  };

const handleToggleFavorite = (e) => {
  e.stopPropagation();

  if (!user) {
    navigate("/login");   // redirect to login if not logged in
    return;
  }

  if (isFavorite) {
    dispatch(removeFavorite(product.id));
  } else {
    dispatch(addFavorite(product));
  }
};


  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex-col "
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 p-4"
          />
        </div>
        
        {/* Favorites Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
        </button>

        {product.rating?.rate >= 4.5 && (
          <div className="absolute top-3 left-3">
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Popular
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {'★'.repeat(Math.round(product.rating?.rate || 0))}
            {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({product.rating?.count || 0})
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </p>
          
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="transition-opacity group-hover:opacity-100 lg:opacity-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
