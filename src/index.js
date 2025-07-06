import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // якщо ти щось хочеш там
import './App.css';   // важливо для стилів

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
