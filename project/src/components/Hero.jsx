import React from 'react';
import { Sparkles, ArrowRight, Camera, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Hero = ({ onStartStyling, onStartCamera, onShowLogin }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-2 text-red-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">AI-Powered Styling</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Find Your
                <span className="block text-red-500">Perfect Style</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {isAuthenticated 
                  ? "Get personalized outfit recommendations based on your body type, color preferences, and style. Our AI stylist creates looks that make you feel confident and beautiful."
                  : "Join thousands of fashion lovers who trust our AI stylist. Sign up to get personalized outfit recommendations that make you feel confident and beautiful."
                }
              </motion.p>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={onStartCamera}
                    className="group bg-red-500 text-white px-8 py-4 rounded-full font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="h-5 w-5" />
                    <span>Start AI Styling</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={onShowLogin}
                    className="group bg-red-500 text-white px-8 py-4 rounded-full font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              )}
              
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {isAuthenticated 
                  ? "✨ AI-powered styling • 📱 Instant results • 🛍️ Shop directly"
                  : "✨ Free to join • 📱 Instant styling • 🛍️ Personalized recommendations"
                }
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg"
                alt="Fashion model"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating cards */}
            <motion.div 
              className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">98% Match</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="text-sm">
                <div className="font-medium">Complete Look</div>
                <div className="text-gray-500">$89.99</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="bg-white py-16 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Matching",
                description: "Advanced algorithms analyze your preferences to suggest the perfect outfits for your body type and style.",
                color: "red"
              },
              {
                icon: Camera,
                title: "Photo Analysis",
                description: "Take a photo and let our AI instantly analyze your body shape, skin tone, and recommend perfect styles.",
                color: "blue"
              },
              {
                icon: ArrowRight,
                title: "Instant Results",
                description: "Get personalized outfit recommendations in seconds. No waiting, just instant style inspiration.",
                color: "green"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;