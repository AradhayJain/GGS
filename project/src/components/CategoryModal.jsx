import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CategoryModal = ({ isOpen, onClose, category, onCategorySelect }) => {
  const { addToCart } = useCart();

  // Mock category data
  const categoryData = {
    women: [
      {
        id: 'w1',
        name: 'Elegant Blazer',
        price: 89.99,
        imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['black', 'navy', 'beige'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w2',
        name: 'Silk Blouse',
        price: 59.99,
        imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['white', 'cream', 'pink'],
        sizes: ['XS', 'S', 'M', 'L']
      },
      {
        id: 'w3',
        name: 'Midi Dress',
        price: 79.99,
        imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['black', 'navy', 'burgundy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w4',
        name: 'High-Waisted Jeans',
        price: 49.99,
        imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['dark-wash', 'light-wash'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      }
    ],
    men: [
      {
        id: 'm1',
        name: 'Classic Suit',
        price: 199.99,
        imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['black', 'navy', 'charcoal'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'm2',
        name: 'Casual Shirt',
        price: 39.99,
        imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['white', 'blue', 'grey'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'm3',
        name: 'Denim Jeans',
        price: 59.99,
        imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['dark-wash', 'light-wash', 'black'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'm4',
        name: 'Polo Shirt',
        price: 29.99,
        imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['white', 'navy', 'red'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      }
    ],
    kids: [
      {
        id: 'k1',
        name: 'Kids T-Shirt',
        price: 19.99,
        imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['blue', 'pink', 'yellow'],
        sizes: ['2T', '3T', '4T', '5T', '6T']
      },
      {
        id: 'k2',
        name: 'Kids Dress',
        price: 34.99,
        imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['pink', 'purple', 'white'],
        sizes: ['2T', '3T', '4T', '5T', '6T']
      },
      {
        id: 'k3',
        name: 'Kids Jeans',
        price: 29.99,
        imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['blue', 'black'],
        sizes: ['2T', '3T', '4T', '5T', '6T']
      },
      {
        id: 'k4',
        name: 'Kids Hoodie',
        price: 39.99,
        imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['grey', 'navy', 'red'],
        sizes: ['2T', '3T', '4T', '5T', '6T']
      }
    ],
    sale: [
      {
        id: 's1',
        name: 'Summer Dress - 50% OFF',
        price: 29.99,
        originalPrice: 59.99,
        imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['floral', 'solid'],
        sizes: ['XS', 'S', 'M', 'L']
      },
      {
        id: 's2',
        name: 'Winter Coat - 40% OFF',
        price: 89.99,
        originalPrice: 149.99,
        imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['black', 'grey', 'camel'],
        sizes: ['S', 'M', 'L', 'XL']
      },
      {
        id: 's3',
        name: 'Casual Sneakers - 30% OFF',
        price: 45.99,
        originalPrice: 65.99,
        imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['white', 'black'],
        sizes: ['6', '7', '8', '9', '10']
      },
      {
        id: 's4',
        name: 'Designer Bag - 60% OFF',
        price: 59.99,
        originalPrice: 149.99,
        imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['black', 'brown'],
        sizes: ['One Size']
      }
    ]
  };

  const items = categoryData[category] || [];

  const handleAddToCart = (item) => {
    addToCart(item, item.sizes[0], item.colors[0]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {category} Collection
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-[3/4] bg-white overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">4.5</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {item.colors.length} colors • {item.sizes.length} sizes
                          </div>
                          <motion.button
                            onClick={() => handleAddToCart(item)}
                            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ShoppingBag className="h-3 w-3" />
                            <span>Add</span>
                          </motion.button>
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

export default CategoryModal;