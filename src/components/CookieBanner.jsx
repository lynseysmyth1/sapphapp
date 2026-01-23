import React, { useState, useEffect } from 'react';
import { handleCookieConsent, trackPageView } from '../utils/analytics';
import './CookieBanner.css';

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBottomNav, setHasBottomNav] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('sapph_cookie_consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }

    // Check if bottom navigation exists (for authenticated pages)
    const checkBottomNav = () => {
      const bottomNav = document.querySelector('.bottom-navigation');
      setHasBottomNav(!!bottomNav);
    };

    checkBottomNav();
    // Check periodically in case navigation appears/disappears
    const interval = setInterval(checkBottomNav, 100);
    
    return () => clearInterval(interval);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('sapph_cookie_consent', 'all');
    setIsVisible(false);
    // Initialize Google Analytics and track current page
    handleCookieConsent('all');
    trackPageView(window.location.pathname);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('sapph_cookie_consent', 'essential');
    setIsVisible(false);
    // Don't initialize GA for essential only
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`cookie-banner ${hasBottomNav ? 'with-bottom-nav' : ''}`}>
      <div className="cookie-banner-content">
        <p className="cookie-banner-message">
          We use cookies to make our website work and give you the best online experience
        </p>
        <div className="cookie-banner-buttons">
          <button 
            className="cookie-button cookie-button-essential"
            onClick={handleEssentialOnly}
          >
            Essential Only
          </button>
          <button 
            className="cookie-button cookie-button-accept"
            onClick={handleAcceptAll}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
