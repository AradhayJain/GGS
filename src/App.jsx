@@ .. @@
import React, { useState } from 'react';
import { motion } from 'framer-motion';
+import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import OutfitCatalog from './components/OutfitCatalog';
import FloatingClothes from './components/FloatingClothes';
import CameraCapture from './components/CameraCapture';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
-  const [currentView, setCurrentView] = useState('home');
  const [userPreferences, setUserPreferences] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
+  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleStartCamera = () => {
-    setCurrentView('camera');
+    setIsCameraOpen(true);
  };

  const handleShowLogin = () => {
    // This will be handled by the Header component
  };

  const handleCameraAnalysisComplete = (analysis, preferences, prompt) => {
    setUserPreferences(preferences);
    setUserPrompt(prompt);
-    setCurrentView('catalog');
+    setIsCameraOpen(false);
+    // Navigation to catalog will be handled by React Router
  };

-  const handleBackHome = () => {
-    setCurrentView('home');
-    setUserPreferences(null);
-    setUserPrompt('');
-  };

  const handleCategorySelect = (category) => {
    // Category selection is handled in the CategoryModal
  };

  return (
+    <Router>
       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
         <FloatingClothes />
         
         <motion.div
           className="relative z-10"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
         >
           <Header 
-            onLogoClick={handleBackHome} 
             onCategorySelect={handleCategorySelect}
           />
           
-          {currentView === 'home' && (
-            <Hero 
-              onStartCamera={handleStartCamera}
-              onShowLogin={handleShowLogin}
-            />
-          )}
-          
-          {currentView === 'catalog' && userPreferences && (
-            <OutfitCatalog 
-              preferences={userPreferences}
-              prompt={userPrompt}
-              onBack={handleBackHome}
-            />
-          )}
+          <Routes>
+            <Route 
+              path="/" 
+              element={
+                <Hero 
+                  onStartCamera={handleStartCamera}
+                  onShowLogin={handleShowLogin}
+                />
+              } 
+            />
+            <Route 
+              path="/catalog" 
+              element={
+                userPreferences ? (
+                  <OutfitCatalog 
+                    preferences={userPreferences}
+                    prompt={userPrompt}
+                  />
+                ) : (
+                  <Navigate to="/" replace />
+                )
+              } 
+            />
+          </Routes>

           <CameraCapture
-            isOpen={currentView === 'camera'}
-            onClose={handleBackHome}
+            isOpen={isCameraOpen}
+            onClose={() => setIsCameraOpen(false)}
             onAnalysisComplete={handleCameraAnalysisComplete}
           />
         </motion.div>
       </div>
+    </Router>
   );
 }