import React, { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';
import backgroundImage from '../../uploaded_images/image1.jpg';
import logoImage from '../../LOGOS FOR SAPPH /White logo.png';

const APP_VERSION = '1.0.79';
const LAST_CHANGE = 'Update mobile profile layout and styl...';

export default function SplashScreen({ onSignIn }) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(0);
  const buttonTimerRef = useRef(null);

  useEffect(() => {
    if (backgroundLoaded && logoLoaded) {
      setLogoOpacity(1);
      
      // Clear any existing timer
      if (buttonTimerRef.current) {
        clearTimeout(buttonTimerRef.current);
      }
      
      buttonTimerRef.current = setTimeout(() => {
        setContentOpacity(1);
        buttonTimerRef.current = null;
      }, 1000);

      return () => {
        if (buttonTimerRef.current) {
          clearTimeout(buttonTimerRef.current);
        }
      };
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
