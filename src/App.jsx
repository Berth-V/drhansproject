import './App.css';
import { HashRouter, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer/Footer';
import Form from './components/Shared/Form/Form';
import WhatsAppBtn from './components/Shared/WhatsAppBtn/WhatsAppBtn';
import CallButton from './components/Shared/CallButton/CallButton';

function App() {
  const location = useLocation();
  // Contact Page Detect
  const isContactPage = location.pathname === '/contact';

  return (
    <>
      <Header />
      <AppRoutes />
      {!isContactPage && <Form variant="sticky" />}
      <CallButton />
      <WhatsAppBtn />
      <Footer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
