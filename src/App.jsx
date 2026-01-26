import React, { useState, useEffect, useCallback, useRef } from 'react';
import SplashScreen from './components/SplashScreen';
import PasswordPage from './components/PasswordPage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import LikesPage from './components/LikesPage';
import BottomNavigation from './components/BottomNavigation';
import ErrorBoundary from './components/ErrorBoundary';
import { storage } from './utils/storage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [likesPageKey, setLikesPageKey] = useState(0);
  const transitionTimeoutRef = useRef(null);

  // Check authentication on mount
  useEffect(() => {
    const authenticated = storage.getItem('sapph_authenticated') === 'true';
    setIsAuthenticated(authenticated);
    
    // Reset scroll position on mount
    requestAnimationFrame(() => {
      const mainContent = document.querySelector('.main-content-transition');
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    });
  }, []);

  const handlePasswordCorrect = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleSignIn = useCallback(() => {
    setIsTransitioning(true);
    setCurrentView('home');
    
    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    // After transition completes, hide splash screen
    transitionTimeoutRef.current = setTimeout(() => {
      setShowSplash(false);
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 500);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const handleNavigate = useCallback((view) => {
    // If clicking likes button while already on likes page, reset the page
    if (view === 'likes' && currentView === 'likes') {
      setLikesPageKey(prev => prev + 1);
    }
    setCurrentView(view);
    
    // Reset scroll position when navigating
    requestAnimationFrame(() => {
      const mainContent = document.querySelector('.main-content-transition');
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    });
  }, [currentView]);

  // Show password page if not authenticated
  if (!isAuthenticated) {
    return <PasswordPage onPasswordCorrect={handlePasswordCorrect} />;
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
          <div className="main-content-scrollable">
            <ErrorBoundary>
              {currentView === 'home' && <ProfilePage />}
              {currentView === 'likes' && <LikesPage key={likesPageKey} />}
              {currentView === 'chat' && <ChatPage />}
            </ErrorBoundary>
          </div>
          <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
        </div>
      </div>
    </>
  );
}

export default App;

