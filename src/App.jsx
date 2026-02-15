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
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [likesPageKey, setLikesPageKey] = useState(0);
  const transitionTimeoutRef = useRef(null);

  // Check authentication on mount
  useEffect(() => {
    const authenticated = storage.getItem('sapph_authenticated') === 'true';
    setIsAuthenticated(authenticated);
    
    // Reset scroll position on mount - use double RAF for reliability
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reset all profile pages (vertical scroll)
        const profilePages = document.querySelectorAll('.profile-page');
        profilePages.forEach(page => {
          if (page) {
            page.scrollTop = 0;
          }
        });
        
        // Reset window scroll
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      });
    });
  }, []);

  const handlePasswordCorrect = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const transitionToApp = useCallback(() => {
    setIsTransitioning(true);
    setCurrentView('home');
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setShowSplash(false);
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 500);
  }, []);

  const handleSocialAuthSuccess = useCallback(() => {
    storage.setItem('sapph_authenticated', 'true');
    setIsAuthenticated(true);
    setShowSplash(false);
  }, []);

  const handleSignInWithEmail = useCallback(() => {
    setShowEmailSignIn(true);
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
    
    // Reset scroll position when navigating - use double RAF for reliability
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reset all profile pages (vertical scroll)
        const profilePages = document.querySelectorAll('.profile-page');
        profilePages.forEach(page => {
          if (page) {
            page.scrollTop = 0;
          }
        });
        
        // Reset window scroll
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      });
    });
  }, [currentView]);

  // Not authenticated: show splash (two-step) or password page if they chose email
  if (!isAuthenticated) {
    if (showEmailSignIn) {
      return <PasswordPage onPasswordCorrect={handlePasswordCorrect} />;
    }
    return (
      <SplashScreen
        onSignInWithEmail={handleSignInWithEmail}
        onSocialAuthSuccess={handleSocialAuthSuccess}
      />
    );
  }

  return (
    <>
      <div className="app-wrapper">
        {showSplash && (
          <div 
            className={`splash-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          >
            <SplashScreen
              onSignInWithEmail={transitionToApp}
              onSocialAuthSuccess={handleSocialAuthSuccess}
            />
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
        </div>
        {(!showSplash || isTransitioning) && (
          <div className="bottom-navigation-wrapper">
            <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

