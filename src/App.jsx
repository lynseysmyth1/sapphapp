import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import PasswordPage from './components/PasswordPage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import LikesPage from './components/LikesPage';
import BottomNavigation from './components/BottomNavigation';
import ErrorBoundary from './components/ErrorBoundary';
import CookieBanner from './components/CookieBanner';
import { initGA, trackPageView } from './utils/analytics';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [likesPageKey, setLikesPageKey] = useState(0);

  // Check authentication on mount and initialize GA
  useEffect(() => {
    const authenticated = localStorage.getItem('sapph_authenticated') === 'true';
    setIsAuthenticated(authenticated);
    
    // Initialize Google Analytics if user has already accepted all cookies
    initGA();
  }, []);

  // Track page views when currentView changes
  useEffect(() => {
    if (isAuthenticated && !showSplash) {
      const pageName = currentView === 'home' ? '/' : `/${currentView}`;
      trackPageView(pageName);
    }
  }, [currentView, isAuthenticated, showSplash]);

  const handlePasswordCorrect = () => {
    setIsAuthenticated(true);
  };

  const handleSignIn = () => {
    setIsTransitioning(true);
    setCurrentView('home');
    
    // After transition completes, hide splash screen
    setTimeout(() => {
      setShowSplash(false);
      setIsTransitioning(false);
    }, 500);
  };

  const handleNavigate = (view) => {
    // If clicking likes button while already on likes page, reset the page
    if (view === 'likes' && currentView === 'likes') {
      setLikesPageKey(prev => prev + 1);
    }
    setCurrentView(view);
  };

  // Show password page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <PasswordPage onPasswordCorrect={handlePasswordCorrect} />
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <div className="app-wrapper">
        {showSplash && (
          <div 
            className={`splash-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          >
            <SplashScreen onSignIn={handleSignIn} />
          </div>
        )}
        <div 
          className={`main-content-transition ${(!showSplash || isTransitioning) ? 'fade-in' : ''}`}
        >
          <ErrorBoundary>
            {currentView === 'home' && <ProfilePage />}
            {currentView === 'likes' && <LikesPage key={likesPageKey} />}
            {currentView === 'chat' && <ChatPage />}
          </ErrorBoundary>
          <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
        </div>
      </div>
      <CookieBanner />
    </>
  );
}

export default App;

