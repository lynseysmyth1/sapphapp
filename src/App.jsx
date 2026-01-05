import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import LikesPage from './components/LikesPage';
import BottomNavigation from './components/BottomNavigation';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [likesPageKey, setLikesPageKey] = useState(0);

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

  return (
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
        {currentView === 'home' && <ProfilePage />}
        {currentView === 'likes' && <LikesPage key={likesPageKey} />}
        {currentView === 'chat' && <ChatPage />}
        <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

export default App;

