import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RotateCcw, Check, Upload, Sparkles } from 'lucide-react';

const CameraCapture = ({ isOpen, onClose, onAnalysisComplete }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
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
      }
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const analyzeImage = useCallback(async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    
    // Simulate ML analysis - in a real app, this would call your ML API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis = {
      bodyShape: ['hourglass', 'pear', 'apple', 'rectangle', 'inverted-triangle'][Math.floor(Math.random() * 5)],
      bodyType: ['petite', 'regular', 'tall', 'plus-size'][Math.floor(Math.random() * 4)],
      colorTone: ['warm', 'cool', 'neutral'][Math.floor(Math.random() * 3)],
      confidence: 85 + Math.random() * 10
    };

    setIsAnalyzing(false);
    setAnalysisResult(mockAnalysis);
    setShowQuestionnaire(true);
  }, [capturedImage]);

  const handleQuestionnaireComplete = () => {
    const preferences = {
      bodyShape: analysisResult.bodyShape,
      bodyType: analysisResult.bodyType,
      colorTone: analysisResult.colorTone,
      budget: budget,
      style: 'casual', // Default from AI analysis
      occasion: 'casual' // Default from AI analysis
    };

    onAnalysisComplete(analysisResult, preferences, prompt);
    handleClose();
  };

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    setIsAnalyzing(false);
    setShowQuestionnaire(false);
    setAnalysisResult(null);
    setBudget('');
    setPrompt('');
    onClose();
  }, [stopCamera, onClose]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuestionnaireComplete();
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  }, [stopCamera]);

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
            className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">AI Body Analysis</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                {!isStreaming && !capturedImage && !showQuestionnaire && (
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Take a Photo for AI Analysis
                      </h3>
                      <p className="text-gray-600 max-w-md">
                        Our AI will analyze your body shape, type, and skin tone to provide personalized outfit recommendations.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={startCamera}
                        className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <Camera className="h-5 w-5" />
                        <span>Start Camera</span>
                      </button>
                      <div className="text-gray-500">or</div>
                      <label className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors cursor-pointer flex items-center space-x-2">
                        <Upload className="h-5 w-5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {isStreaming && !showQuestionnaire && (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full max-w-md rounded-xl"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={capturePhoto}
                        className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <Camera className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                )}

                {capturedImage && !showQuestionnaire && (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full max-w-md rounded-xl"
                      />
                    </div>
                    
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-black rounded-full mx-auto"></div>
                        <p className="text-gray-600">Analyzing your photo...</p>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <button
                          onClick={retakePhoto}
                          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                        >
                          <RotateCcw className="h-5 w-5" />
                          <span>Retake</span>
                        </button>
                        <button
                          onClick={analyzeImage}
                          className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
                        >
                          <Check className="h-5 w-5" />
                          <span>Analyze</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {showQuestionnaire && analysisResult && (
                  <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Analysis Complete!
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Body Shape:</span>
                            <span className="font-medium capitalize">{analysisResult.bodyShape}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Body Type:</span>
                            <span className="font-medium capitalize">{analysisResult.bodyType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Color Tone:</span>
                            <span className="font-medium capitalize">{analysisResult.colorTone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Confidence:</span>
                            <span className="font-medium">{Math.round(analysisResult.confidence)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What's your budget range?
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Budget Range</option>
                          <option value="under-50">Under $50</option>
                          <option value="50-100">$50 - $100</option>
                          <option value="100-200">$100 - $200</option>
                          <option value="above-200">$200+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Describe your style preferences or occasion
                        </label>
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="e.g., I need professional outfits for work meetings, or I love bohemian style for weekend outings..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                          rows={4}
                          required
                        />
                      </div>

                      <button
                        onClick={(e)=>handleSubmit(e)}
                        disabled={!budget || !prompt.trim()}
                        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Sparkles className="h-5 w-5" />
                        <span>Get My Outfits</span>
                      </button>
                    </div>
                  </div>
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