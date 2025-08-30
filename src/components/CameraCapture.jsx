import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RotateCcw, Check, Upload, Sparkles, ArrowRight, User, DollarSign, MessageSquare } from 'lucide-react';

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
    
    // Navigate to catalog after a brief delay to show results
    setTimeout(() => {
      onAnalysisComplete(mockAnalysis, preferences, prompt);
      handleClose();
    }, 2000);
  }, [capturedImage, budget, prompt, onAnalysisComplete]);

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

  const budgetOptions = [
    { value: 'under-50', label: 'Under $50', description: 'Budget-friendly finds' },
    { value: '50-100', label: '$50 - $100', description: 'Great value pieces' },
    { value: '100-200', label: '$100 - $200', description: 'Quality investment' },
    { value: 'above-200', label: '$200+', description: 'Premium selection' }
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
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-pink-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">AI Style Assistant</h2>
                    <p className="text-sm text-gray-600">Get personalized outfit recommendations</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-center space-x-8">
                  {[
                    { step: 'upload', label: 'Upload Photo', icon: Camera },
                    { step: 'details', label: 'Style Preferences', icon: User },
                    { step: 'analyzing', label: 'AI Analysis', icon: Sparkles }
                  ].map(({ step, label, icon: Icon }, index) => (
                    <div key={step} className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        currentStep === step 
                          ? 'bg-red-500 text-white' 
                          : index < ['upload', 'details', 'analyzing'].indexOf(currentStep)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={`text-sm font-medium ${
                        currentStep === step ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {label}
                      </span>
                      {index < 2 && (
                        <div className={`w-8 h-0.5 ${
                          index < ['upload', 'details', 'analyzing'].indexOf(currentStep)
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                {/* Step 1: Upload Photo */}
                {currentStep === 'upload' && (
                  <motion.div
                    className="text-center space-y-8 max-w-md w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {!isStreaming && !capturedImage && (
                      <>
                        <div className="space-y-4">
                          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                            <Camera className="h-12 w-12 text-red-500" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              Let's Analyze Your Style
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              Upload a photo of yourself and our AI will analyze your body shape, 
                              skin tone, and style preferences to create perfect outfit recommendations.
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <motion.button
                            onClick={startCamera}
                            className="w-full bg-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-3 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Camera className="h-6 w-6" />
                            <span>Take Photo</span>
                          </motion.button>
                          
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                          </div>
                          
                          <label className="w-full bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center space-x-3 border-2 border-dashed border-gray-300 hover:border-gray-400">
                            <Upload className="h-6 w-6" />
                            <span>Upload from Gallery</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <p className="text-sm text-blue-800">
                            <strong>Privacy Note:</strong> Your photos are processed securely and never stored permanently.
                          </p>
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
                            className="w-full max-w-sm rounded-2xl shadow-lg"
                          />
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <motion.button
                              onClick={capturePhoto}
                              className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Camera className="h-8 w-8" />
                            </motion.button>
                          </div>
                        </div>
                        <p className="text-gray-600">Position yourself in the frame and click to capture</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Style Preferences */}
                {currentStep === 'details' && capturedImage && (
                  <motion.div
                    className="w-full max-w-2xl space-y-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Perfect! Now Tell Us About Your Style
                      </h3>
                      <p className="text-gray-600">
                        Help us create the perfect recommendations just for you
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Photo Preview */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                          <Camera className="h-5 w-5 text-red-500" />
                          <span>Your Photo</span>
                        </h4>
                        <div className="relative">
                          <img
                            src={capturedImage}
                            alt="Your photo"
                            className="w-full max-w-sm rounded-2xl shadow-lg mx-auto"
                          />
                          <button
                            onClick={retakePhoto}
                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                          >
                            <RotateCcw className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Budget Selection */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <DollarSign className="h-5 w-5 text-green-500" />
                            <span>What's your budget?</span>
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {budgetOptions.map((option) => (
                              <motion.label
                                key={option.value}
                                className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  budget === option.value
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-gray-900">{option.label}</span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      budget === option.value
                                        ? 'border-red-500 bg-red-500'
                                        : 'border-gray-300'
                                    }`}>
                                      {budget === option.value && (
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                </div>
                              </motion.label>
                            ))}
                          </div>
                        </div>

                        {/* Style Prompt */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                            <span>Describe your style goals</span>
                          </h4>
                          <div className="relative">
                            <textarea
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                              placeholder="Tell us about the occasion, your style preferences, or what you're looking for. For example: 'I need professional outfits for work meetings' or 'I love bohemian style for weekend outings'..."
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
                              rows={4}
                              required
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                              {prompt.length}/500
                            </div>
                          </div>
                          
                          {/* Quick suggestions */}
                          <div className="flex flex-wrap gap-2">
                            {[
                              'Professional work attire',
                              'Casual weekend looks',
                              'Date night outfits',
                              'Vacation wardrobe',
                              'Party ready styles'
                            ].map((suggestion) => (
                              <button
                                key={suggestion}
                                type="button"
                                onClick={() => setPrompt(suggestion)}
                                className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={!budget || !prompt.trim()}
                          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Sparkles className="h-6 w-6" />
                          <span>Generate My Outfits</span>
                          <ArrowRight className="h-5 w-5" />
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Analysis */}
                {currentStep === 'analyzing' && (
                  <motion.div
                    className="text-center space-y-8 max-w-md w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="relative">
                          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                            <motion.div
                              className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Sparkles className="h-8 w-8 text-red-500" />
                          </motion.div>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-gray-900">
                            AI is Analyzing Your Style
                          </h3>
                          <div className="space-y-2">
                            {[
                              'Analyzing body shape and proportions...',
                              'Determining color palette...',
                              'Matching style preferences...',
                              'Curating perfect outfits...'
                            ].map((text, index) => (
                              <motion.p
                                key={index}
                                className="text-gray-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.8 }}
                              >
                                {text}
                              </motion.p>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : analysisResult && (
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto">
                          <Check className="h-10 w-10 text-green-600" />
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Analysis Complete!
                          </h3>
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-3 bg-white rounded-xl">
                                <div className="text-sm text-gray-600">Body Shape</div>
                                <div className="font-bold text-gray-900 capitalize">{analysisResult.bodyShape}</div>
                              </div>
                              <div className="text-center p-3 bg-white rounded-xl">
                                <div className="text-sm text-gray-600">Body Type</div>
                                <div className="font-bold text-gray-900 capitalize">{analysisResult.bodyType}</div>
                              </div>
                              <div className="text-center p-3 bg-white rounded-xl">
                                <div className="text-sm text-gray-600">Color Tone</div>
                                <div className="font-bold text-gray-900 capitalize">{analysisResult.colorTone}</div>
                              </div>
                              <div className="text-center p-3 bg-white rounded-xl">
                                <div className="text-sm text-gray-600">Match Score</div>
                                <div className="font-bold text-green-600">{Math.round(analysisResult.confidence)}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600">
                          Redirecting to your personalized catalog...
                        </p>
                      </motion.div>
                    )}
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