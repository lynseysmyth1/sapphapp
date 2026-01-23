import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-4TBG5T9E3N';

// Initialize Google Analytics
export const initGA = () => {
  const cookieConsent = localStorage.getItem('sapph_cookie_consent');
  
  // Only initialize if user has accepted all cookies and GA is not already initialized
  if (cookieConsent === 'all' && !ReactGA.isInitialized()) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: false,
    });
    return true;
  }
  return false;
};

// Track page view
export const trackPageView = (page) => {
  const cookieConsent = localStorage.getItem('sapph_cookie_consent');
  
  // Only track if user has accepted all cookies and GA is initialized
  if (cookieConsent === 'all' && ReactGA.isInitialized()) {
    ReactGA.send({ hitType: 'pageview', page_path: page });
  }
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  const cookieConsent = localStorage.getItem('sapph_cookie_consent');
  
  // Only track if user has accepted all cookies and GA is initialized
  if (cookieConsent === 'all' && ReactGA.isInitialized()) {
    ReactGA.event({
      action: eventName,
      ...eventParams,
    });
  }
};

// Re-initialize GA when user accepts all cookies
export const handleCookieConsent = (consent) => {
  if (consent === 'all') {
    // Initialize GA
    initGA();
  }
};
