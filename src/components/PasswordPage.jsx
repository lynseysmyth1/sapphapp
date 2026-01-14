import React, { useState } from 'react';
import './PasswordPage.css';
import backgroundImage from '../../uploaded_images/image1.jpg';
import logoImage from '../../uploaded_images/logo.png';

const CORRECT_PASSWORD = 'sapphapp26';

export default function PasswordPage({ onPasswordCorrect }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        // Store authentication in localStorage
        localStorage.setItem('sapph_authenticated', 'true');
        setIsLoading(false);
        onPasswordCorrect();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
        setIsLoading(false);
      }
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
