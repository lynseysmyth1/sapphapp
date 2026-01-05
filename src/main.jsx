import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Simplified rendering - removed font loading delay
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, rendering App...');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('App rendered successfully');
}

