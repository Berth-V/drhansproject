import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer/Footer';
import ContactBar from './components/Shared/ContactBar/ContactBar';

function App() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  // La landing de seguros lleva su propio header mínimo, sin menú
  const isLandingPage = location.pathname === '/seguros';

  return (
    <>
      {!isLandingPage && <Header />}
      <AppRoutes />
      <ContactBar />
      <Footer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
}