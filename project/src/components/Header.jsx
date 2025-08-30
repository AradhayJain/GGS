import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SearchModal from './SearchModal';
import CartModal from './CartModal';
import AuthModals from './AuthModals';
import CategoryModal from './CategoryModal';

const Header = ({ onLogoClick, onCategorySelect }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(true);
  };

  const handleSwitchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <motion.header 
        className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 cursor-pointer"
              onClick={onLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-2xl font-bold tracking-tight text-black">
                H&M<span className="text-red-500">.</span>
              </h1>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Women', 'Men', 'Kids', 'Sale'].map((item, index) => (
                <motion.a
                  key={item}
                  onClick={() => handleCategoryClick(item.toLowerCase())}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                  style={{ cursor: 'pointer' }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {!isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => setIsSignupOpen(true)}
                    className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </div>
              ) : (
                <>
                  <motion.button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <User className="h-5 w-5" />
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-sm text-gray-700 whitespace-nowrap">
                        {user?.firstName}
                      </p>
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 mt-2 pointer-events-auto"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsCartOpen(true)}
                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors relative rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <AnimatePresence>
                      {getTotalItems() > 0 && (
                        <motion.span
                          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          {getTotalItems()}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {isAuthenticated && (
        <>
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
      )}
      
      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onCloseSignup={() => setIsSignupOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
      
      <CategoryModal
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        category={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
    </>
  );
};

export default Header;