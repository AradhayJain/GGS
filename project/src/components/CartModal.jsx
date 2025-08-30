import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

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
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600">Add some items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((cartItem) => (
                      <motion.div
                        key={cartItem.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={cartItem.item.imageUrl}
                            alt={cartItem.item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{cartItem.item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {cartItem.selectedColor} • {cartItem.selectedSize}
                          </p>
                          <p className="text-lg font-bold text-gray-900">${cartItem.item.price}</p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => removeFromCart(cartItem.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;