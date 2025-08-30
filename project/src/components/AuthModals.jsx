import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// NOTE: This is a placeholder for a real API. In a real application,
// you would replace these URLs with your actual backend endpoints.
const API_URL = 'http://localhost:3000/api';

// --- Helper Components moved to the top level ---

const ModalWrapper = ({ isOpen, onClose, children }) => (
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
          className="absolute inset-0 flex items-center justify-center p-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ErrorDisplay = ({ message }) => (
  message && (
    <div className="flex items-center p-3 my-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
      <span className="font-medium">{message}</span>
    </div>
  )
);


// --- Main AuthModals Component ---

const AuthModals = ({ isLoginOpen, isSignupOpen, onCloseLogin, onCloseSignup, onSwitchToSignup, onSwitchToLogin }) => {
  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    PhoneNumber: '',
    Gender: '',
    DOB: ''
  });

  // Reset state when modals are closed
  const handleCloseLogin = () => {
    setLoginData({ email: '', password: '' });
    setError(null);
    setIsLoading(false);
    onCloseLogin();
  };
  
  const handleCloseSignup = () => {
    setSignupData({ firstName: '', lastName: '', email: '', password: '', PhoneNumber: '', Gender: '', DOB: '' });
    setError(null);
    setIsLoading(false);
    onCloseSignup();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint for login
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.message || 'Failed to login.');
      }

      // Handle successful login (e.g., store token, update user context)
      login(data)
      console.log('Login successful:', data);
      handleCloseLogin();
      
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint for signup
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account.');
      }
      
      // Handle successful signup (e.g., show success message, auto-login)
      console.log('Signup successful:', data);
      handleCloseSignup();

    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Login Modal */}
      <ModalWrapper isOpen={isLoginOpen} onClose={handleCloseLogin}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <button
              onClick={handleCloseLogin}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <ErrorDisplay message={error} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </ModalWrapper>

      {/* Signup Modal */}
      <ModalWrapper isOpen={isSignupOpen} onClose={handleCloseSignup}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <button
              onClick={handleCloseSignup}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
             <ErrorDisplay message={error} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupInputChange}
                  className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={signupData.PhoneNumber}
                  onChange={handleSignupInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={signupData.Gender}
                onChange={handleSignupInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={signupData.DOB}
                  onChange={handleSignupInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default AuthModals;
