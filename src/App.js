import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Dashboard/Home';
import Cart from './pages/Cart/Cart';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import ProductDetails from './pages/Dashboard/ProductDetails';

function App() {
  const { mode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${mode === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;