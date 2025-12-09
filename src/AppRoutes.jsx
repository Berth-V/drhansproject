import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

const Home = lazy(() => import('./components/Home/Home'));
const About = lazy(() => import('./components/About/About'));
const Procedures = lazy(() => import('./components/Procedures/Procedures'));
const ProceduresDetail = lazy(() => import('./components/Procedures/ProceduresDetail'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/procedures" element={<Procedures />} />
        <Route path="/procedures/:partId" element={<ProceduresDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
