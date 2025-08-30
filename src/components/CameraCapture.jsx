import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RotateCcw, Upload, Sparkles, ArrowRight, User, DollarSign, MessageSquare, Check, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CameraCapture = ({ isOpen, onClose, onAnalysisComplete }) => {
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'details', 'analyzing'
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [budget, setBudget] = useState('');
  const [prompt, setPrompt] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
        setCurrentStep('details');
      }
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setCurrentStep('upload');
    startCamera();
  }, [startCamera]);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result);
        stopCamera();
        setCurrentStep('details');
      };
      reader.readAsDataURL(file);
    }
  }, [stopCamera]);

  const analyzeAndProceed = useCallback(async () => {
    if (!capturedImage || !budget || !prompt.trim()) return;

    setCurrentStep('analyzing');
    setIsAnalyzing(true);
    
    // Simulate ML analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis = {
      bodyShape: ['hourglass', 'pear', 'apple', 'rectangle', 'inverted-triangle'][Math.floor(Math.random() * 5)],
      bodyType: ['petite', 'regular', 'tall', 'plus-size'][Math.floor(Math.random() * 4)],
      colorTone: ['warm', 'cool', 'neutral'][Math.floor(Math.random() * 3)],
      confidence: 85 + Math.random() * 10
    };

    const preferences = {
      bodyShape: mockAnalysis.bodyShape,
      bodyType: mockAnalysis.bodyType,
      colorTone: mockAnalysis.colorTone,
      budget: budget,
      style: 'casual',
      occasion: 'casual'
    };

    setIsAnalyzing(false);
    setAnalysisResult(mockAnalysis);
    
    // Complete analysis and navigate to catalog
    onAnalysisComplete(mockAnalysis, preferences, prompt);
    
    // Navigate to catalog after brief delay
    setTimeout(() => {
      navigate('/catalog');
      handleClose();
    }, 2000);
  }, [capturedImage, budget, prompt, onAnalysisComplete, navigate]);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    setCurrentStep('upload');
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setBudget('');
    setPrompt('');
    onClose();
  }, [stopCamera, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeAndProceed();
  };

  const handleNextStep = () => {
    if (currentStep === 'upload' && capturedImage) {
      setCurrentStep('details');
    }
  };

  const budgetOptions = [
    { value: 'under-50', label: 'Under $50', description: 'Budget-friendly finds', emoji: '💰' },
    { value: '50-100', label: '$50 - $100', description: 'Great value pieces', emoji: '💳' },
    { value: '100-200', label: '$100 - $200', description: 'Quality investment', emoji: '💎' },
    { value: 'above-200', label: '$200+', description: 'Premium selection', emoji: '👑' }
  ];

  const stylePrompts = [
    'Professional work attire for meetings',
    'Casual weekend looks for comfort',
    'Date night outfits that impress',
    'Vacation wardrobe for travel',
    'Party ready glamorous styles',
    'Minimalist everyday essentials',
    'Boho chic for creative vibes',
    'Sporty athleisure for active days'
  ];

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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="absolute inset-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="relative px-6 py-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Style Assistant</h2>
                      <p className="text-white/80">Get personalized outfit recommendations</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="mt-6">
                  <div className="flex items-center justify-center space-x-4">
                    {[
                      { step: 'upload', label: 'Upload Photo', icon: Image },
                      { step: 'details', label: 'Style Preferences', icon: User },
                      { step: 'analyzing', label: 'AI Analysis', icon: Sparkles }
                    ].map(({ step, label, icon: Icon }, index) => (
                      <div key={step} className="flex items-center space-x-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep === step 
                            ? 'bg-white text-red-500 shadow-lg scale-110' 
                            : ['upload', 'details', 'analyzing'].indexOf(currentStep) > index
                              ? 'bg-white/30 text-white'
                              : 'bg-white/10 text-white/60'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`text-sm font-medium hidden sm:block ${
                          currentStep === step ? 'text-white' : 'text-white/70'
                        }`}>
                          {label}
                        </span>
                        {index < 2 && (
                          <div className={`w-12 h-0.5 transition-colors duration-300 ${
                            ['upload', 'details', 'analyzing'].indexOf(currentStep) > index
                              ? 'bg-white/50'
                              : 'bg-white/20'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Step 1: Upload Photo */}
                {currentStep === 'upload' && (
                  <motion.div
                    className="h-full flex items-center justify-center p-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                  >
                    <div className="text-center space-y-8 max-w-lg w-full">
                      {!isStreaming && !capturedImage && (
                        <>
                          <div className="space-y-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                              <Camera className="h-16 w-16 text-red-500" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Upload Your Photo
                              </h3>
                              <p className="text-lg text-gray-600 leading-relaxed">
                                Take a clear photo of yourself or upload one from your gallery. 
                                Our AI will analyze your body shape, skin tone, and style to create 
                                personalized outfit recommendations.
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <motion.button
                              onClick={startCamera}
                              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-3 shadow-xl"
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Camera className="h-7 w-7" />
                              <span>Take Photo with Camera</span>
                            </motion.button>
                            
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                              </div>
                              <div className="relative flex justify-center text-sm">
                                <span className="px-6 bg-white text-gray-500 font-medium">or</span>
                              </div>
                            </div>
                            
                            <label className="w-full bg-white border-3 border-dashed border-gray-300 text-gray-700 px-8 py-5 rounded-2xl font-bold text-lg hover:border-red-300 hover:bg-red-50 transition-all cursor-pointer flex items-center justify-center space-x-3 group">
                              <Upload className="h-7 w-7 group-hover:text-red-500 transition-colors" />
                              <span className="group-hover:text-red-500 transition-colors">Upload from Gallery</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-blue-50 p-4 rounded-xl text-center">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-white font-bold">1</span>
                              </div>
                              <p className="text-blue-800 font-medium">Secure & Private</p>
                              <p className="text-blue-600">Photos processed securely</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl text-center">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-white font-bold">2</span>
                              </div>
                              <p className="text-green-800 font-medium">AI Analysis</p>
                              <p className="text-green-600">Body shape & color tone</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-xl text-center">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-white font-bold">3</span>
                              </div>
                              <p className="text-purple-800 font-medium">Perfect Matches</p>
                              <p className="text-purple-600">Curated just for you</p>
                            </div>
                          </div>
                        </>
                      )}

                      {isStreaming && (
                        <div className="space-y-6">
                          <div className="relative">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              className="w-full max-w-md rounded-3xl shadow-2xl mx-auto"
                            />
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                              <motion.button
                                onClick={capturePhoto}
                                className="bg-white text-red-500 p-5 rounded-full shadow-2xl hover:bg-gray-50 transition-colors border-4 border-white"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Camera className="h-10 w-10" />
                              </motion.button>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg text-gray-700 font-medium">Position yourself in the frame</p>
                            <p className="text-gray-500">Make sure you're well-lit and clearly visible</p>
                          </div>
                        </div>
                      )}

                      {capturedImage && currentStep === 'upload' && (
                        <div className="space-y-6">
                          <div className="relative">
                            <img
                              src={capturedImage}
                              alt="Captured"
                              className="w-full max-w-md rounded-3xl shadow-2xl mx-auto"
                            />
                          </div>
                          
                          <div className="flex justify-center space-x-4">
                            <motion.button
                              onClick={retakePhoto}
                              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <RotateCcw className="h-5 w-5" />
                              <span>Retake</span>
                            </motion.button>
                            <motion.button
                              onClick={handleNextStep}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all flex items-center space-x-2 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Check className="h-5 w-5" />
                              <span>Looks Good</span>
                              <ArrowRight className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Style Preferences */}
                {currentStep === 'details' && (
                  <motion.div
                    className="p-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center space-y-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          Perfect! Now Tell Us Your Style
                        </h3>
                        <p className="text-lg text-gray-600">
                          Help us create the perfect recommendations just for you
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Photo Preview */}
                        <div className="space-y-6">
                          <div className="text-center">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
                              <Camera className="h-6 w-6 text-red-500" />
                              <span>Your Photo</span>
                            </h4>
                            <div className="relative inline-block">
                              <img
                                src={capturedImage}
                                alt="Your photo"
                                className="w-full max-w-sm rounded-3xl shadow-xl"
                              />
                              <button
                                onClick={retakePhoto}
                                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors group"
                              >
                                <RotateCcw className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                              </button>
                              <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                ✓ Ready for Analysis
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                          {/* Budget Selection */}
                          <div className="space-y-4">
                            <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                              <DollarSign className="h-6 w-6 text-green-500" />
                              <span>What's your budget?</span>
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                              {budgetOptions.map((option) => (
                                <motion.label
                                  key={option.value}
                                  className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                    budget === option.value
                                      ? 'border-red-500 bg-red-50 shadow-lg'
                                      : 'border-gray-200 hover:border-red-300 hover:bg-red-25 hover:shadow-md'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <input
                                    type="radio"
                                    name="budget"
                                    value={option.value}
                                    checked={budget === option.value}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="sr-only"
                                  />
                                  <div className="flex items-center space-x-4 flex-1">
                                    <div className="text-2xl">{option.emoji}</div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-900 text-lg">{option.label}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                          budget === option.value
                                            ? 'border-red-500 bg-red-500'
                                            : 'border-gray-300'
                                        }`}>
                                          {budget === option.value && (
                                            <motion.div 
                                              className="w-3 h-3 bg-white rounded-full"
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{ type: "spring", stiffness: 500 }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-gray-600 mt-1">{option.description}</p>
                                    </div>
                                  </div>
                                </motion.label>
                              ))}
                            </div>
                          </div>

                          {/* Style Prompt */}
                          <div className="space-y-4">
                            <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                              <MessageSquare className="h-6 w-6 text-blue-500" />
                              <span>Describe your style goals</span>
                            </h4>
                            <div className="relative">
                              <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Tell us about the occasion, your style preferences, or what you're looking for..."
                                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 resize-none text-gray-700 placeholder-gray-400 text-lg leading-relaxed"
                                rows={4}
                                maxLength={500}
                                required
                              />
                              <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-white px-2 py-1 rounded-lg">
                                {prompt.length}/500
                              </div>
                            </div>
                            
                            {/* Quick suggestions */}
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-700">Quick suggestions:</p>
                              <div className="flex flex-wrap gap-2">
                                {stylePrompts.map((suggestion) => (
                                  <motion.button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => setPrompt(suggestion)}
                                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors border border-gray-200 hover:border-red-200"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {suggestion}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <motion.button
                            type="submit"
                            disabled={!budget || !prompt.trim()}
                            className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-5 rounded-2xl font-bold text-lg hover:from-red-600 hover:via-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Sparkles className="h-6 w-6" />
                            <span>Generate My Perfect Outfits</span>
                            <ArrowRight className="h-6 w-6" />
                          </motion.button>
                        </form>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Analysis */}
                {currentStep === 'analyzing' && (
                  <motion.div
                    className="h-full flex items-center justify-center p-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="text-center space-y-8 max-w-lg w-full">
                      {isAnalyzing ? (
                        <>
                          <div className="relative">
                            <div className="w-40 h-40 bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                              <motion.div
                                className="w-24 h-24 border-6 border-red-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              />
                            </div>
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                            >
                              <Sparkles className="h-12 w-12 text-red-500" />
                            </motion.div>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-gray-900">
                              AI is Creating Your Style Profile
                            </h3>
                            <div className="space-y-3">
                              {[
                                { text: 'Analyzing body shape and proportions...', delay: 0 },
                                { text: 'Determining your perfect color palette...', delay: 1 },
                                { text: 'Matching your style preferences...', delay: 2 },
                                { text: 'Curating personalized outfits...', delay: 3 }
                              ].map(({ text, delay }, index) => (
                                <motion.div
                                  key={index}
                                  className="flex items-center justify-center space-x-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: delay * 0.8 }}
                                >
                                  <motion.div
                                    className="w-2 h-2 bg-red-500 rounded-full"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ delay: delay * 0.8, duration: 1, repeat: Infinity }}
                                  />
                                  <p className="text-gray-600 text-lg">{text}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : analysisResult && (
                        <motion.div
                          className="space-y-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xl">
                            <Check className="h-12 w-12 text-green-600" />
                          </div>
                          
                          <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                              Analysis Complete! 🎉
                            </h3>
                            <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-3xl p-8 shadow-lg">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                                  <div className="text-sm text-gray-600 mb-1">Body Shape</div>
                                  <div className="text-xl font-bold text-gray-900 capitalize">{analysisResult.bodyShape}</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                                  <div className="text-sm text-gray-600 mb-1">Body Type</div>
                                  <div className="text-xl font-bold text-gray-900 capitalize">{analysisResult.bodyType}</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                                  <div className="text-sm text-gray-600 mb-1">Color Tone</div>
                                  <div className="text-xl font-bold text-gray-900 capitalize">{analysisResult.colorTone}</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                                  <div className="text-sm text-gray-600 mb-1">Match Score</div>
                                  <div className="text-xl font-bold text-green-600">{Math.round(analysisResult.confidence)}%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                              <motion.div
                                className="w-3 h-3 bg-red-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              <p className="text-lg text-gray-600 font-medium">
                                Redirecting to your personalized catalog...
                              </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CameraCapture;