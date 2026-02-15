import React, { useState, useRef, useEffect } from 'react';
import './PasswordPage.css';
import backgroundImage from '../../uploaded_images/image1.jpg';
import logoImage from '../../uploaded_images/logo.png';
import { storage } from '../utils/storage';

const CORRECT_PASSWORD = 'sapphapp26';

export default function PasswordPage({ onPasswordCorrect }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Simulate a brief delay for better UX
    timeoutRef.current = setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        // Store authentication in localStorage
        const success = storage.setItem('sapph_authenticated', 'true');
        if (success) {
          setIsLoading(false);
          onPasswordCorrect();
        } else {
          setError('Unable to save authentication. Please try again.');
          setIsLoading(false);
        }
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
        setIsLoading(false);
      }
      timeoutRef.current = null;
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="password-container">
      <div className="password-background-container">
        <img
          src={backgroundImage}
          alt=""
          className="password-background-image"
          role="presentation"
        />
      </div>
      <div className="password-content">
        <div className="password-logo-container">
          <img
            src={logoImage}
            alt="Sapph Logo"
            className="password-logo-image"
          />
        </div>
        <form className="password-form" onSubmit={handleSubmit}>
          <div className="password-input-wrapper">
            <div className="password-input-row">
              <input
                type={showPassword ? 'text' : 'password'}
                className="password-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                autoFocus
                aria-label="Password input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="password-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="password-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <div className="password-error" role="alert">
                {error}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="password-submit-btn"
            disabled={isLoading}
            aria-label="Submit password"
          >
            {isLoading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
