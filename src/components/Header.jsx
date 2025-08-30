@@ .. @@
import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
+import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SearchModal from './SearchModal';
import CartModal from './CartModal';
import AuthModals from './AuthModals';
import CategoryModal from './CategoryModal';

-const Header = ({ onLogoClick, onCategorySelect }) => {
+const Header = ({ onCategorySelect }) => {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [isLoginOpen, setIsLoginOpen] = useState(false);
   const [isSignupOpen, setIsSignupOpen] = useState(false);
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState('');
   const { getTotalItems } = useCart();
   const { isAuthenticated, user, logout } = useAuth();
+  const navigate = useNavigate();
+  const location = useLocation();

   const handleCategoryClick = (category) => {
     setSelectedCategory(category);
     setIsCategoryOpen(true);
   };

+  const handleLogoClick = () => {
+    navigate('/');
+  };

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
-              onClick={onLogoClick}
+              onClick={handleLogoClick}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <h1 className="text-2xl font-bold tracking-tight text-black">
                 H&M<span className="text-red-500">.</span>
               </h1>
             </motion.div>