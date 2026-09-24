import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer/Footer';
import WhatsAppBtn from './components/Shared/WhatsAppBtn/WhatsAppBtn';
import CallButton from './components/Shared/CallButton/CallButton';

function App() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <>
      <Header />
      <AppRoutes />
      <CallButton />
      <WhatsAppBtn />
      <Footer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}