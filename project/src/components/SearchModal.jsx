import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star } from 'lucide-react';
import { mockOutfitItems } from '../utils/outfitGenerator';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockOutfitItems.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesQuery && matchesCategory;
      });
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory]);

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'accessories', 'shoes'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white shadow-2xl"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="max-w-4xl mx-auto p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Search Products</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for clothes, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                  autoFocus
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No products found for "{searchQuery}"
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="aspect-square bg-white rounded-lg mb-3 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 capitalize">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">${item.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">4.5</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;