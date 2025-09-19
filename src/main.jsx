import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

//Le HashRouter me permet de gérer la navigation dans l'application avec des routes basées sur le hash de l'URL.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ToastContainer />
      <App />
    </HashRouter>
  </StrictMode>,
);
