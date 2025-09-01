import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../redux/slices/favoritesSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Your saved items will appear here</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No favorites yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Start adding items to your favorites by clicking the heart icon on any product.</p>
            <Button onClick={handleContinueShopping} className="px-8 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Favorites</h1>
            <p className="text-gray-600 dark:text-gray-400">{favorites.length} item{favorites.length !== 1 ? 's' : ''} saved for later</p>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <button
                onClick={() => handleRemoveFavorite(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Remove from favorites"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="mt-3">
                <Button 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {favorites.length > 0 && (
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Love your favorites?</h3>
            <p className="text-blue-600 dark:text-blue-300 mb-4">Add them to your cart before they're gone!</p>
            <Link to="/cart">
              <Button variant="primary">
                View Cart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;