import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import LanguageGuard from './components/LanguageGate/LanguageGuard';
import './i18n';

// localhost or dev detector
const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const isGateway = !isLocalhost && !window.location.hash;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isGateway ? <LanguageGuard /> : <App />}
  </StrictMode>
);
