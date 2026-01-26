import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Simplified rendering - removed font loading delay
const rootElement = document.getElementById('root');

if (!rootElement) {
  // This should never happen in a properly configured app
  throw new Error('Root element not found! Please ensure index.html contains a div with id="root"');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

