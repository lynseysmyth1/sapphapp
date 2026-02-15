import React, { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';
import backgroundImage from '../../uploaded_images/image1.jpg';
import logoImage from '../../LOGOS FOR SAPPH /White logo.png';
import { isFirebaseConfigured, signInWithGoogle, signInWithApple } from '../utils/firebase';

const APP_VERSION = '1.0.115';

export default function SplashScreen({
  onSignInWithEmail,
  onSocialAuthSuccess,
}) {
  const [contentVisible, setContentVisible] = useState(false);
  const [step, setStep] = useState('choice');
  const [intent, setIntent] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  const showSocial = isFirebaseConfigured();
  const handleSuccess = onSocialAuthSuccess;

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setContentVisible(true);
      timerRef.current = null;
    }, 80);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const goToMethod = (createOrSignIn) => {
    setIntent(createOrSignIn);
    setStep('method');
    setError('');
  };

  const goBack = () => {
    setStep('choice');
    setIntent(null);
    setError('');
  };

  const handleEmail = () => {
    setError('');
    if (onSignInWithEmail) {
      onSignInWithEmail();
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading('google');
    try {
      await signInWithGoogle();
      handleSuccess?.();
    } catch (err) {
      setError(err?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleApple = async () => {
    setError('');
    setLoading('apple');
    try {
      await signInWithApple();
      handleSuccess?.();
    } catch (err) {
      setError(err?.message || 'Apple sign-in failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="splash-container">
      <div className="background-container">
        <img
          src={backgroundImage}
          alt=""
          className="background-image"
          role="presentation"
        />
      </div>
      <div className="logo-container">
        <img
          src={logoImage}
          alt="Sapph Logo"
          className="logo-image"
          style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 0.4s ease-out' }}
        />
      </div>
      <div
        className="splash-buttons"
        style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 0.4s ease-out' }}
      >
        {step === 'choice' && (
          <>
            <button
              className="btn-primary"
              aria-label="Create account"
              onClick={() => goToMethod('create')}
            >
              Create Account
            </button>
            <button
              className="btn-secondary"
              aria-label="Sign in"
              onClick={() => goToMethod('signin')}
            >
              Sign In
            </button>
          </>
        )}

        {step === 'method' && (
          <>
            <button
              type="button"
              className="btn-back"
              onClick={goBack}
              aria-label="Back"
            >
              ← Back
            </button>
            <button
              type="button"
              className="btn-method btn-method-email"
              onClick={handleEmail}
              disabled={!!loading}
              aria-label={intent === 'create' ? 'Create account with email' : 'Sign in with email'}
            >
              <svg className="btn-email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <path d="M22 6L12 13 2 6" />
              </svg>
              <span className="splash-social-btn-text">
                {intent === 'create' ? 'Create account with email' : 'Sign in with email'}
              </span>
            </button>
            {showSocial && (
              <>
                <button
                  type="button"
                  className="btn-method btn-apple"
                  onClick={handleApple}
                  disabled={!!loading}
                  aria-label="Continue with Apple"
                >
                  {loading === 'apple' ? (
                    <span className="splash-social-btn-text">Signing in…</span>
                  ) : (
                    <>
                      <span className="btn-apple-icon" aria-hidden="true" />
                      <span className="splash-social-btn-text">Continue with Apple</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn-method btn-google"
                  onClick={handleGoogle}
                  disabled={!!loading}
                  aria-label="Continue with Google"
                >
                  {loading === 'google' ? (
                    <span className="splash-social-btn-text">Signing in…</span>
                  ) : (
                    <>
                      <span className="btn-google-icon" aria-hidden="true" />
                      <span className="splash-social-btn-text">Continue with Google</span>
                    </>
                  )}
                </button>
              </>
            )}
          </>
        )}

        {error && (
          <div className="splash-auth-error" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
