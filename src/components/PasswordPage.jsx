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
            <input
              type="password"
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
