import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Find the "root" div from index.html and render our App inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
