import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

const Home = lazy(() => import('./Home/Home'));
const About = lazy(() => import('./About/About'));
const Procedures = lazy(() => import('./Procedures/Procedures'));
const ProceduresDetail = lazy(() => import('./Procedures/ProceduresDetail'));
const Contact = lazy(() => import('./Contact/Contact'));

function TransitionRoutes() {
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
      </Routes>
    </Suspense>
  );
}

export default TransitionRoutes;