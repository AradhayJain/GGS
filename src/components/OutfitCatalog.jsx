@@ .. @@
import React, { useMemo, useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Star, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
+import { useNavigate } from 'react-router-dom';
import { generateOutfitRecommendations } from '../utils/outfitGenerator';
import { useCart } from '../contexts/CartContext';

-const OutfitCatalog = ({ preferences, prompt, onBack }) => {
+const OutfitCatalog = ({ preferences, prompt }) => {
   const [selectedFilter, setSelectedFilter] = useState('all');
   const [favorites, setFavorites] = useState(new Set());
   const [selectedOutfit, setSelectedOutfit] = useState(null);
   const { addToCart } = useCart();
+  const navigate = useNavigate();

   const outfits = useMemo(() => {
     return generateOutfitRecommendations(preferences, prompt);
   }, [preferences, prompt]);

   const filteredOutfits = useMemo(() => {
     if (selectedFilter === 'all') return outfits;
     return outfits.filter(outfit => 
       outfit.name.toLowerCase().includes(selectedFilter) ||
       outfit.items.some(item => item.category === selectedFilter)
     );
   }, [outfits, selectedFilter]);

   const toggleFavorite = (outfitId) => {
     setFavorites(prev => {
       const newFavorites = new Set(prev);
       if (newFavorites.has(outfitId)) {
         newFavorites.delete(outfitId);
       } else {
         newFavorites.add(outfitId);
       }
       return newFavorites;
     });
   };

   const handleAddToCart = (outfit) => {
     outfit.items.forEach(item => {
       addToCart(item, item.sizes[0], item.colors[0]);
     });
   };

+  const handleBackHome = () => {
+    navigate('/');
+  };

   return (
     <motion.div 
       className="min-h-screen bg-gray-50 relative z-10"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.6 }}
     >
       {/* Header */}
       <motion.div 
         className="bg-white/90 backdrop-blur-md shadow-sm"
         initial={{ y: -50 }}
         animate={{ y: 0 }}
         transition={{ duration: 0.6 }}
       >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-4">
               <motion.button
-                onClick={onBack}
+                onClick={handleBackHome}
                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                 whileHover={{ x: -5 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <ArrowLeft className="h-5 w-5" />
                 <span>Back to Home</span>
               </motion.button>