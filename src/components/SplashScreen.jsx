import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import backgroundImage from '../../uploaded_images/image1.jpg';
import logoImage from '../../LOGOS FOR SAPPH /White logo.png';

const APP_VERSION = '1.0.69';
const LAST_CHANGE = 'Increase logo and text sizes across a...';

export default function SplashScreen({ onSignIn }) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(0);

  useEffect(() => {
    if (backgroundLoaded && logoLoaded) {
      setLogoOpacity(1);
      
      const buttonTimer = setTimeout(() => {
        setContentOpacity(1);
      }, 1000);

      return () => clearTimeout(buttonTimer);
    }
  }, [backgroundLoaded, logoLoaded]);

  return (
    <div className="splash-container">
      <div className="version-label">
        <div>v{APP_VERSION}</div>
        <div className="version-change">{LAST_CHANGE}</div>
      </div>
      <div className="background-container">
        <img
          src={backgroundImage}
          alt=""
          className="background-image"
          onLoad={() => setBackgroundLoaded(true)}
          role="presentation"
        />
      </div>
      <div className="logo-container">
        <img
          src={logoImage}
          alt="Sapph Logo"
          className="logo-image"
          style={{ opacity: logoOpacity, transition: 'opacity 0.8s ease-in-out' }}
          onLoad={() => setLogoLoaded(true)}
        />
      </div>
      <div 
        className="splash-buttons"
        style={{ opacity: contentOpacity, transition: 'opacity 0.8s ease-in-out' }}
      >
        <button 
          className="btn-primary"
          aria-label="Create account"
        >
          Create Account
        </button>
        <button 
          className="btn-secondary" 
          onClick={onSignIn}
          aria-label="Sign in"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
