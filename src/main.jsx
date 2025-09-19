import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Utilisation de HashRouter pour le routing, ce qui est utile pour les déploiements sur GitHub Pages.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ToastContainer />
      <App />
    </HashRouter>
  </StrictMode>,
);
